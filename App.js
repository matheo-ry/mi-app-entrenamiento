import React, { useState, useEffect, useRef } from 'react';
import { 
  StyleSheet, 
  Text, 
  View, 
  TextInput, 
  TouchableOpacity, 
  ScrollView, 
  SafeAreaView, 
  StatusBar, 
  Platform, 
  Alert, 
  ActivityIndicator,
  Modal
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Haptics from 'expo-haptics';
import { Feather, Ionicons } from '@expo/vector-icons';

// 1. DATA ESTRUCTURA
const ROUTINE_DATA = {
  "pecho-espalda": {
    title: "Pecho / Espalda",
    exercises: [
      { name: "Press Horizontal en máquina", notes: "3 series.", totalSets: 3 },
      { name: "Press Inclinado", notes: "2 series.", totalSets: 2 },
      { name: "Aperturas en polea sentado", notes: "2 series.", totalSets: 2 },
      { name: "Remo en T", notes: "3 series.", totalSets: 3 },
      { name: "Jalón Dorsal Plano Frontal", notes: "2 series.", totalSets: 2 },
      { name: "Jalón Dorsal Plano Sagital", notes: "2 series.", totalSets: 2 },
      { name: "Laterales en polea (Hombro)", notes: "2 series.", totalSets: 2 },
      { name: "Hombro Posterior", notes: "1 serie.", totalSets: 1 }
    ]
  },
  "brazo-pierna-1": {
    title: "Brazo / Pierna 1",
    exercises: [
      { name: "Press Francés", notes: "2 series.", totalSets: 2 },
      { name: "Extensión de tríceps en polea", notes: "3 series.", totalSets: 3 },
      { name: "Curl Banco Scott Unilateral", notes: "3 series.", totalSets: 3 },
      { name: "Martillo en polea", notes: "2 series.", totalSets: 2 },
      { name: "Elevaciones laterales", notes: "2 series.", totalSets: 2 },
      { name: "Extensión de cuádriceps", notes: "3 series.", totalSets: 3 },
      { name: "Sentadilla Péndulo", notes: "2 series.", totalSets: 2 },
      { name: "Curl Femoral Sentado", notes: "2 series.", totalSets: 2 }
    ]
  },
  "espalda-pecho": {
    title: "Espalda / Pecho",
    exercises: [
      { name: "Remo en T", notes: "3 series.", totalSets: 3 },
      { name: "Jalón Dorsal Plano Frontal", notes: "2 series.", totalSets: 2 },
      { name: "Jalón Dorsal Plano Sagital", notes: "2 series.", totalSets: 2 },
      { name: "Press Horizontal en máquina", notes: "2 series.", totalSets: 2 },
      { name: "Press Inclinado", notes: "2 series.", totalSets: 2 },
      { name: "Aperturas en polea sentado", notes: "2 series.", totalSets: 2 },
      { name: "Laterales en polea (Hombro)", notes: "2 series.", totalSets: 2 },
      { name: "Hombro Posterior", notes: "1 serie.", totalSets: 1 }
    ]
  },
  "brazo-pierna-2": {
    title: "Brazo / Pierna 2",
    exercises: [
      { name: "Press Francés", notes: "2 series.", totalSets: 2 },
      { name: "Extensión de tríceps en polea", notes: "3 series.", totalSets: 3 },
      { name: "Curl Banco Scott Unilateral", notes: "3 series.", totalSets: 3 },
      { name: "Martillo en polea", notes: "2 series.", totalSets: 2 },
      { name: "Elevaciones laterales", notes: "2 series.", totalSets: 2 },
      { name: "Extensión de cuádriceps", notes: "3 series.", totalSets: 3 },
      { name: "Sentadilla Péndulo", notes: "2 series.", totalSets: 2 },
      { name: "Curl Femoral Sentado", notes: "2 series.", totalSets: 2 }
    ]
  }
};

const GOOGLE_SHEETS_URL = "https://script.google.com/macros/s/AKfycbxoKN58eAj0bFaBJ_jZaqsjFdH5GZbR5aMNf4r8mAghHiwWvSlFl097MCGbVJVrwydp/exec";

export default function App() {
  // Navigation & Screens state
  const [currentScreen, setCurrentScreen] = useState('home'); // home, workout-general, workout-foco, metrics, metrics-detail
  const [currentRoutineKey, setCurrentRoutineKey] = useState(null);
  const [currentExerciseIndex, setCurrentExerciseIndex] = useState(0);

  // Sync Button Visual Indicator State
  const [syncStatus, setSyncStatus] = useState('idle'); // idle, loading, success, error

  // Workout state
  const [isWorkoutActive, setIsWorkoutActive] = useState(false);
  const [focoData, setFocoData] = useState({}); // Stores sets & technical setup { exerciseName: { setupTechnical: '', notes: '', sets: { 1: { weight, reps, rir } } } }
  const [dbSetups, setDbSetups] = useState({}); // Dict of setups by exercise name
  const [currentSet, setCurrentSet] = useState(1);

  // Metric details logs state
  const [routineSessions, setRoutineSessions] = useState([]);

  // Technical Setup Modal & Inputs
  const [isInfoModalVisible, setIsInfoModalVisible] = useState(false);
  const [tempSetupText, setTempSetupText] = useState('');

  // Editing historical logs state
  const [isEditModalVisible, setIsEditModalVisible] = useState(false);
  const [editSessionIndex, setEditSessionIndex] = useState(null);
  const [editExerciseIndex, setEditExerciseIndex] = useState(null);
  const [editFocoKey, setEditFocoKey] = useState('');
  const [editSets, setEditSets] = useState({});

  // Rest Timer state
  const [timerSecondsLeft, setTimerSecondsLeft] = useState(90);
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [timerInitialSeconds, setTimerInitialSeconds] = useState(90);
  const [timerManualText, setTimerManualText] = useState('');
  const timerIntervalRef = useRef(null);

  // Debounce save timeout references
  const saveTimeoutRef = useRef(null);

  // Haptic feedback trigger helper
  const triggerHaptic = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
  };

  const [isReady, setIsReady] = useState(false);

  // Developmental Reset & Load on Startup
  useEffect(() => {
    const initializeApp = async () => {
      try {
        const hasCleared = await AsyncStorage.getItem('DEV_CLEARED_ONCE');
        if (!hasCleared) {
          await AsyncStorage.clear();
          await AsyncStorage.setItem('DEV_CLEARED_ONCE', 'true');
          console.log("AsyncStorage purgado para desarrollo.");
        }
        await loadDbSetups();
        await loadActiveSession();
      } catch (e) {
        console.error("Fallo durante la inicialización de la app:", e);
      } finally {
        setIsReady(true);
      }
    };
    initializeApp();
  }, []);

  // Timer logic
  useEffect(() => {
    if (isTimerRunning) {
      timerIntervalRef.current = setInterval(() => {
        setTimerSecondsLeft((prev) => {
          if (prev <= 1) {
            clearInterval(timerIntervalRef.current);
            setIsTimerRunning(false);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    } else {
      if (timerIntervalRef.current) {
        clearInterval(timerIntervalRef.current);
      }
    }
    return () => {
      if (timerIntervalRef.current) {
        clearInterval(timerIntervalRef.current);
      }
    };
  }, [isTimerRunning]);

  // Load state from DB_SETUPS
  const loadDbSetups = async () => {
    try {
      const saved = await AsyncStorage.getItem('DB_SETUPS');
      if (saved) {
        setDbSetups(JSON.parse(saved) || {});
      }
    } catch (e) {
      console.error("Error loading DB_SETUPS:", e);
    }
  };

  // Load active session from CURRENT_ACTIVE_SESSION
  const loadActiveSession = async () => {
    try {
      const saved = await AsyncStorage.getItem('CURRENT_ACTIVE_SESSION');
      if (saved) {
        const parsed = JSON.parse(saved);
        // Validate the stored session has all required fields
        if (
          parsed &&
          parsed.isWorkoutActive === true &&
          parsed.routineKey &&
          ROUTINE_DATA[parsed.routineKey] // ensure routine still exists
        ) {
          setIsWorkoutActive(true);
          setCurrentRoutineKey(parsed.routineKey);
          setFocoData(parsed.focoData || {});
          console.log('Sesión activa restaurada:', parsed.routineKey);
        } else {
          // Stale or corrupt session — clean it up
          await AsyncStorage.removeItem('CURRENT_ACTIVE_SESSION');
        }
      }
    } catch (e) {
      console.error('Error loading active session:', e);
      await AsyncStorage.removeItem('CURRENT_ACTIVE_SESSION');
    }
  };

  // Save CURRENT_ACTIVE_SESSION with debounce (500ms)
  const saveActiveSessionDebounced = (updatedFoco) => {
    if (saveTimeoutRef.current) {
      clearTimeout(saveTimeoutRef.current);
    }
    saveTimeoutRef.current = setTimeout(() => {
      flushSaveActiveSession(updatedFoco);
    }, 500);
  };

  // Immediate save of CURRENT_ACTIVE_SESSION
  const flushSaveActiveSession = async (updatedFoco) => {
    // Guard: never persist if workout ended
    if (!isWorkoutActive && !updatedFoco) return;
    if (saveTimeoutRef.current) {
      clearTimeout(saveTimeoutRef.current);
    }
    const currentFoco = updatedFoco || focoData;
    if (!currentRoutineKey) return; // guard: no key = nothing to persist
    const sessionObj = {
      isWorkoutActive: true,
      routineKey: currentRoutineKey,
      focoData: currentFoco
    };
    try {
      await AsyncStorage.setItem('CURRENT_ACTIVE_SESSION', JSON.stringify(sessionObj));
    } catch (e) {
      console.error('flushSaveActiveSession error:', e);
    }
  };

  // Format timer countdown
  const formatTimerTime = (seconds) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  // Steppers calculation handlers
  const updateActiveInput = (field, action) => {
    if (!isWorkoutActive) return;
    triggerHaptic();
    const routine = ROUTINE_DATA[currentRoutineKey];
    if (!routine) return;
    const exercise = routine.exercises[currentExerciseIndex];
    const key = `${currentRoutineKey}-${currentExerciseIndex}`;
    
    // Ensure current exercise structure exists
    const updated = { ...focoData };
    if (!updated[key]) {
      updated[key] = { notes: '', setupTechnical: dbSetups[exercise.name] || '', sets: {} };
    }
    if (!updated[key].sets[currentSet]) {
      updated[key].sets[currentSet] = { weight: '', reps: '', rir: '' };
    }

    const currentVal = updated[key].sets[currentSet][field];

    if (field === 'weight') {
      let num = parseFloat(currentVal) || 0;
      if (action === 'plus') num += 2.5;
      else if (action === 'minus') num = Math.max(0, num - 2.5);
      updated[key].sets[currentSet].weight = num === 0 ? '' : num.toString();
    } else if (field === 'reps') {
      let num = parseInt(currentVal, 10) || 0;
      if (action === 'plus') num += 1;
      else if (action === 'minus') num = Math.max(0, num - 1);
      updated[key].sets[currentSet].reps = num === 0 ? '' : num.toString();
    } else if (field === 'rir') {
      if (action === 'plus') {
        if (currentVal === 'F') {
          updated[key].sets[currentSet].rir = '0';
        } else {
          let num = parseInt(currentVal, 10) || 0;
          num += 1;
          updated[key].sets[currentSet].rir = num.toString();
        }
      } else if (action === 'minus') {
        if (currentVal === '0' || currentVal === '' || currentVal === '00') {
          updated[key].sets[currentSet].rir = 'F';
        } else if (currentVal !== 'F') {
          let num = parseInt(currentVal, 10) || 0;
          num = Math.max(0, num - 1);
          updated[key].sets[currentSet].rir = num === 0 && currentVal === '1' ? '0' : num.toString();
        }
      }
    }

    setFocoData(updated);
    saveActiveSessionDebounced(updated);
  };

  // Keyboard typing input handlers
  const handleInputChange = (field, text) => {
    const routine = ROUTINE_DATA[currentRoutineKey];
    if (!routine) return;
    const exercise = routine.exercises[currentExerciseIndex];
    const key = `${currentRoutineKey}-${currentExerciseIndex}`;

    const updated = { ...focoData };
    if (!updated[key]) {
      updated[key] = { notes: '', setupTechnical: dbSetups[exercise.name] || '', sets: {} };
    }
    if (!updated[key].sets[currentSet]) {
      updated[key].sets[currentSet] = { weight: '', reps: '', rir: '' };
    }

    updated[key].sets[currentSet][field] = text;
    setFocoData(updated);
    saveActiveSessionDebounced(updated);
  };

  // Handles text area updates for Daily Notes & Technical Setup
  const handleSetupOrNotesChange = (field, text) => {
    const routine = ROUTINE_DATA[currentRoutineKey];
    if (!routine) return;
    const exercise = routine.exercises[currentExerciseIndex];
    const key = `${currentRoutineKey}-${currentExerciseIndex}`;

    const updated = { ...focoData };
    if (!updated[key]) {
      updated[key] = { notes: '', setupTechnical: dbSetups[exercise.name] || '', sets: {} };
    }

    updated[key][field] = text;
    setFocoData(updated);
    saveActiveSessionDebounced(updated);

    if (field === 'setupTechnical') {
      const updatedSetups = { ...dbSetups, [exercise.name]: text };
      setDbSetups(updatedSetups);
      AsyncStorage.setItem('DB_SETUPS', JSON.stringify(updatedSetups));
    }
  };

  // Life-cycle Start Workout
  const startWorkout = () => {
    triggerHaptic();
    setIsWorkoutActive(true);
    // Initialize active session data structure
    const routine = ROUTINE_DATA[currentRoutineKey];
    const initialFoco = {};
    routine.exercises.forEach((ex, idx) => {
      const key = `${currentRoutineKey}-${idx}`;
      const sets = {};
      for (let s = 1; s <= ex.totalSets; s++) {
        sets[s] = { weight: '', reps: '', rir: '' };
      }
      initialFoco[key] = {
        notes: '',
        setupTechnical: dbSetups[ex.name] || '',
        sets: sets
      };
    });
    setFocoData(initialFoco);
    setCurrentExerciseIndex(0);
    setCurrentSet(1);
    
    const sessionObj = {
      isWorkoutActive: true,
      routineKey: currentRoutineKey,
      focoData: initialFoco
    };
    AsyncStorage.setItem('CURRENT_ACTIVE_SESSION', JSON.stringify(sessionObj));
    Alert.alert("Entrenamiento Iniciado", "Toca cualquier ejercicio para ingresar a la Zona de Guerra.");
  };

  // Life-cycle End Workout (Append, not overwrite)
  const endWorkout = async () => {
    triggerHaptic();
    try {
      const savedDb = await AsyncStorage.getItem('DB_WORKOUTS_' + currentRoutineKey);
      let historyArray = [];
      if (savedDb) {
        historyArray = JSON.parse(savedDb);
        if (!Array.isArray(historyArray)) historyArray = [];
      }

      const newSession = {
        date: new Date().toISOString().split('T')[0],
        completed: true,
        focoData: focoData,
        syncPending: true
      };

      historyArray.push(newSession);
      const updatedDbStr = JSON.stringify(historyArray);
      await AsyncStorage.setItem('DB_WORKOUTS_' + currentRoutineKey, updatedDbStr);

      // Clean active session storage
      await AsyncStorage.removeItem('CURRENT_ACTIVE_SESSION');
      setIsWorkoutActive(false);
      setFocoData({});
      setCurrentSet(1);

      Alert.alert("Entrenamiento Finalizado", "Tu sesión ha sido guardada de forma persistente.");
      setCurrentScreen('home');
    } catch (e) {
      console.error(e);
      Alert.alert("Error", "No se pudo finalizar el entrenamiento correctamente.");
    }
  };

  // Manual synchronization to Google Sheets
  const syncToGoogleSheets = async () => {
    triggerHaptic();
    setSyncStatus('loading');
    
    try {
      const routines = Object.keys(ROUTINE_DATA);
      let payloadRows = [];
      let pendingUpdates = {}; // { routineKey: updatedHistoryArray }

      for (let rKey of routines) {
        const saved = await AsyncStorage.getItem('DB_WORKOUTS_' + rKey);
        if (saved) {
          const array = JSON.parse(saved);
          if (Array.isArray(array)) {
            let modified = false;
            const updatedArray = array.map((session, idx) => {
              if (session.syncPending) {
                modified = true;
                // Generate flat Sheets rows for each set
                ROUTINE_DATA[rKey].exercises.forEach((ex, exIdx) => {
                  const fKey = `${rKey}-${exIdx}`;
                  const exData = session.focoData ? session.focoData[fKey] : null;
                  if (exData && exData.sets) {
                    for (let s = 1; s <= ex.totalSets; s++) {
                      const set = exData.sets[s];
                      if (set && (set.weight !== '' || set.reps !== '' || set.rir !== '')) {
                        payloadRows.push({
                          date: session.date,
                          routine: ROUTINE_DATA[rKey].title,
                          exercise: ex.name,
                          setNumber: s,
                          weight: set.weight || 0,
                          reps: set.reps || 0,
                          rir: set.rir || '0',
                          notes: exData.notes || ''
                        });
                      }
                    }
                  }
                });
                return { ...session, syncPending: false };
              }
              return session;
            });
            if (modified) {
              pendingUpdates[rKey] = updatedArray;
            }
          }
        }
      }

      if (payloadRows.length === 0) {
        setSyncStatus('success');
        setTimeout(() => setSyncStatus('idle'), 2000);
        Alert.alert("Sincronización", "Todo está al día.");
        return;
      }

      // Perform POST request
      const response = await fetch(GOOGLE_SHEETS_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ rows: payloadRows })
      });

      if (response.status === 200) {
        // Save pending updates back to local storage
        for (let rKey of Object.keys(pendingUpdates)) {
          await AsyncStorage.setItem('DB_WORKOUTS_' + rKey, JSON.stringify(pendingUpdates[rKey]));
        }
        setSyncStatus('success');
        setTimeout(() => setSyncStatus('idle'), 2000);
        Alert.alert("Sincronización Exitosa", "Los datos han sido subidos a Google Sheets.");
      } else {
        setSyncStatus('error');
        setTimeout(() => setSyncStatus('idle'), 2000);
        Alert.alert("Error de Red", "Fallo al enviar datos. Intenta nuevamente.");
      }
    } catch (e) {
      console.error(e);
      setSyncStatus('error');
      setTimeout(() => setSyncStatus('idle'), 2000);
      Alert.alert("Error de Sincronización", "Revisa tu conexión a Internet.");
    }
  };

  // Navigates between screens & loads specific metrics histories
  const navigateToMetricDetails = async (routineKey) => {
    setCurrentRoutineKey(routineKey);
    try {
      const saved = await AsyncStorage.getItem('DB_WORKOUTS_' + routineKey);
      let array = [];
      if (saved) {
        array = JSON.parse(saved);
        if (!Array.isArray(array)) array = [];
      }
      setRoutineSessions(array);
    } catch (e) {
      console.error(e);
    }
    setCurrentScreen('metrics-detail');
  };

  // Render sets string in the historical metrics list: WeightXRepes(RIR)
  const formatSetsString = (exerciseData, totalSets) => {
    if (!exerciseData || !exerciseData.sets) return "";
    const parts = [];
    for (let s = 1; s <= totalSets; s++) {
      const set = exerciseData.sets[s];
      if (set && (set.weight !== '' || set.reps !== '' || set.rir !== '')) {
        const weight = set.weight !== '' ? set.weight : '0';
        const reps = set.reps !== '' ? set.reps : '0';
        const rir = set.rir !== undefined && set.rir !== '' ? set.rir : '0';
        parts.push(`${weight}x${reps}(${rir})`);
      }
    }
    return parts.join(' / ');
  };

  // Technical setup modal toggle
  const openSetupModal = () => {
    const routine = ROUTINE_DATA[currentRoutineKey];
    const exercise = routine.exercises[currentExerciseIndex];
    const key = `${currentRoutineKey}-${currentExerciseIndex}`;
    const activeText = (focoData[key] && focoData[key].setupTechnical) || dbSetups[exercise.name] || '';
    setTempSetupText(activeText);
    setIsInfoModalVisible(true);
  };

  const saveSetupModalText = () => {
    const routine = ROUTINE_DATA[currentRoutineKey];
    const exercise = routine.exercises[currentExerciseIndex];
    handleSetupOrNotesChange('setupTechnical', tempSetupText);
    setIsInfoModalVisible(false);
  };

  // Open edit historical logs modal
  const openEditLogModal = (sessionIndex, exerciseIdx, exerciseMeta) => {
    const session = routineSessions[sessionIndex];
    if (!session) return;
    const fKey = `${currentRoutineKey}-${exerciseIdx}`;
    
    // Copy active sets
    const exData = session.focoData ? session.focoData[fKey] : null;
    const setsCopy = {};
    for (let s = 1; s <= exerciseMeta.totalSets; s++) {
      if (exData && exData.sets && exData.sets[s]) {
        setsCopy[s] = { ...exData.sets[s] };
      } else {
        setsCopy[s] = { weight: '', reps: '', rir: '' };
      }
    }
    
    setEditSessionIndex(sessionIndex);
    setEditExerciseIndex(exerciseIdx);
    setEditFocoKey(fKey);
    setEditSets(setsCopy);
    setIsEditModalVisible(true);
  };

  const saveEditLogModal = async () => {
    try {
      const updatedSessions = [...routineSessions];
      const session = updatedSessions[editSessionIndex];
      if (!session) return;

      if (!session.focoData) session.focoData = {};
      session.focoData[editFocoKey] = {
        ...session.focoData[editFocoKey],
        sets: editSets,
        notes: session.focoData[editFocoKey] ? session.focoData[editFocoKey].notes : ''
      };
      session.syncPending = true;

      await AsyncStorage.setItem('DB_WORKOUTS_' + currentRoutineKey, JSON.stringify(updatedSessions));
      setRoutineSessions(updatedSessions);
      setIsEditModalVisible(false);
      Alert.alert("Registro Actualizado", "Los cambios han sido guardados en local.");
    } catch (e) {
      console.error(e);
      Alert.alert("Error", "No se pudo actualizar el registro.");
    }
  };

  const handleEditSetInputChange = (setNum, field, val) => {
    const updated = { ...editSets };
    if (!updated[setNum]) updated[setNum] = { weight: '', reps: '', rir: '' };
    updated[setNum][field] = val;
    setEditSets(updated);
  };

  // Screen back navigation helper
  const navigateBackFromFoco = () => {
    flushSaveActiveSession();
    setCurrentScreen('workout-general');
  };

  // Metricas lists chronological items helper
  const getHistoricalExerciseList = (exerciseIdx, totalSets) => {
    const rows = [];
    const key = `${currentRoutineKey}-${exerciseIdx}`;

    // Completed history logs
    routineSessions.forEach((session, index) => {
      const exData = session.focoData ? session.focoData[key] : null;
      const setsStr = formatSetsString(exData, totalSets);
      if (setsStr) {
        rows.push(
          <TouchableOpacity 
            key={`hist-${index}`} 
            style={styles.metricLogBtn}
            onPress={() => openEditLogModal(index, exerciseIdx, ROUTINE_DATA[currentRoutineKey].exercises[exerciseIdx])}
          >
            <Text style={styles.metricLogLabel}>DIA {index + 1}:</Text>
            <Text style={styles.metricLogValue}> {setsStr}</Text>
          </TouchableOpacity>
        );
      }
    });

    // Active session live entry (Red visual accent)
    if (isWorkoutActive && currentRoutineKey != null) {
      const liveExData = focoData[key];
      const liveSetsStr = formatSetsString(liveExData, totalSets);
      if (liveSetsStr) {
        rows.push(
          <TouchableOpacity 
            key="live-item" 
            style={styles.metricLogBtn}
            onPress={() => {
              setCurrentExerciseIndex(exerciseIdx);
              setCurrentSet(1);
              setCurrentScreen('workout-foco');
            }}
          >
            <Text style={[styles.metricLogLabel, { color: '#FF3333' }]}>DIA {routineSessions.length + 1}:</Text>
            <Text style={[styles.metricLogValue, { color: '#FF3333' }]}> {liveSetsStr}</Text>
          </TouchableOpacity>
        );
      }
    }

    if (rows.length === 0) {
      return <Text style={styles.noHistoryText}>Sin registros.</Text>;
    }
    return rows;
  };

  // (getTechnicalSetupText removed - unused function)

  // Helper to retrieve historical rows of completed days for home overview
  const getRealHistoryRowsForHome = (exerciseIdx, totalSets) => {
    const key = `${currentRoutineKey}-${exerciseIdx}`;
    const completedSessions = routineSessions || [];
    const last3 = completedSessions.slice(-3).reverse();

    if (last3.length === 0) return null;

    return last3.map((session, idx) => {
      const exData = session.focoData ? session.focoData[key] : null;
      const setsStr = formatSetsString(exData, totalSets);
      if (!setsStr) return null;
      
      const setsArr = setsStr.split(' / ');
      return (
        <View key={idx} style={styles.homeHistoryRow}>
          {setsArr.map((setVal, setIdx) => (
            <Text key={setIdx} style={styles.homeHistorySetPill}>{setVal}</Text>
          ))}
        </View>
      );
    });
  };

  if (!isReady) {
    return (
      <View style={{ flex: 1, backgroundColor: '#000000', justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#8A2BE2" />
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#000000" />
      
      {/* 1. SCREEN: HOME (ROUTINES LIST) */}
      {currentScreen === 'home' && (
        <View style={styles.screenWrapper}>
          <View style={styles.header}>
            <View>
              <Text style={styles.headerTitle}>WARZONE</Text>
              <Text style={styles.headerSubtitle}>Entrenamiento de hoy</Text>
            </View>
            <TouchableOpacity 
              style={[
                styles.syncBtn, 
                syncStatus === 'loading' && styles.syncBtnLoading,
                syncStatus === 'success' && styles.syncBtnSuccess,
                syncStatus === 'error' && styles.syncBtnError
              ]} 
              onPress={syncToGoogleSheets}
              disabled={syncStatus === 'loading'}
            >
              {syncStatus === 'loading' ? (
                <ActivityIndicator size="small" color="#FFF" />
              ) : (
                <Feather 
                  name={syncStatus === 'success' ? 'check-circle' : syncStatus === 'error' ? 'x-circle' : 'cloud'} 
                  size={20} 
                  color="#FFF" 
                />
              )}
            </TouchableOpacity>
          </View>

          <ScrollView contentContainerStyle={styles.scrollContainer}>
            {Object.keys(ROUTINE_DATA).map((key) => {
              const item = ROUTINE_DATA[key];
              const isActiveHere = isWorkoutActive && currentRoutineKey === key;
              return (
                <TouchableOpacity 
                  key={key} 
                  style={[styles.routineCard, isActiveHere && styles.routineCardActive]}
                  onPress={() => {
                    setCurrentRoutineKey(key);
                    // Fetch real history list for display
                    AsyncStorage.getItem('DB_WORKOUTS_' + key).then(saved => {
                      let array = [];
                      if (saved) {
                        array = JSON.parse(saved);
                        if (!Array.isArray(array)) array = [];
                      }
                      setRoutineSessions(array);
                    });
                    setCurrentScreen('workout-general');
                  }}
                >
                  <View style={styles.routineCardInfo}>
                    <Text style={styles.routineCardTitle}>{item.title}</Text>
                    <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 6, gap: 4 }}>
                      <Ionicons name="barbell-outline" size={12} color="#A0A0A5" />
                      <Text style={styles.routineCardMeta}>{item.exercises.length} ejercicios</Text>
                    </View>
                  </View>
                  <View style={styles.routineCardRight}>
                    {isActiveHere && <View style={styles.activeDot} />}
                    <Feather name="zap" size={16} color={isActiveHere ? "#FF3333" : "#8A2BE2"} />
                  </View>
                </TouchableOpacity>
              );
            })}
          </ScrollView>
        </View>
      )}

      {/* 2. SCREEN: WORKOUT GENERAL (EXERCISES LIST) */}
      {currentScreen === 'workout-general' && (
        <View style={styles.screenWrapper}>
          <View style={styles.header}>
            <TouchableOpacity onPress={() => setCurrentScreen('home')} style={styles.backBtn}>
              <Feather name="arrow-left" size={24} color="#FFF" />
            </TouchableOpacity>
            <View style={styles.headerTitleCentered}>
              <Text style={styles.headerTitle}>{ROUTINE_DATA[currentRoutineKey]?.title}</Text>
              <Text style={styles.headerSubtitle}>Lista de Ejercicios</Text>
            </View>
            <View style={{ width: 24 }} />
          </View>

          <View style={styles.actionButtonsContainer}>
            {!isWorkoutActive ? (
              <TouchableOpacity style={styles.btnStart} onPress={startWorkout}>
                <Text style={styles.btnStartText}>Iniciar Entreno</Text>
              </TouchableOpacity>
            ) : (
              <TouchableOpacity style={styles.btnEnd} onPress={endWorkout}>
                <Text style={styles.btnEndText}>Terminar Entreno</Text>
              </TouchableOpacity>
            )}
          </View>

          <ScrollView contentContainerStyle={styles.scrollContainer}>
            {ROUTINE_DATA[currentRoutineKey]?.exercises.map((ex, idx) => {
              const historyRows = getRealHistoryRowsForHome(idx, ex.totalSets);
              return (
                <TouchableOpacity 
                  key={idx} 
                  style={[styles.exerciseCard, !isWorkoutActive && styles.exerciseCardReadOnly]}
                  onPress={() => {
                    setCurrentExerciseIndex(idx);
                    setCurrentSet(1);
                    setCurrentScreen('workout-foco');
                  }}
                >
                  <View style={styles.exerciseCardHeader}>
                    <Text style={styles.exerciseCardName}>{ex.name}</Text>
                    <Feather name="chevron-right" size={18} color="#A0A0A5" />
                  </View>
                  <Text style={styles.exerciseCardNotes}>{ex.notes}</Text>
                  
                  {historyRows && (
                    <View style={styles.homeHistoryBlock}>
                      {historyRows}
                    </View>
                  )}
                </TouchableOpacity>
              );
            })}
          </ScrollView>
        </View>
      )}

      {/* 3. SCREEN: WORKOUT FOCO (ZONA DE GUERRA) */}
      {currentScreen === 'workout-foco' && (
        <View style={styles.screenWrapper}>
          {/* Header Foco */}
          <View style={styles.focoHeader}>
            <TouchableOpacity onPress={navigateBackFromFoco} style={styles.backBtn}>
              <Feather name="arrow-left" size={24} color="#FFF" />
            </TouchableOpacity>
            <View style={styles.focoTitleContainer}>
              <Text style={styles.focoExerciseName} numberOfLines={1}>
                {ROUTINE_DATA[currentRoutineKey]?.exercises[currentExerciseIndex]?.name}
              </Text>
              <Text style={styles.focoSubtitle}>
                Ejercicio {currentExerciseIndex + 1} de {ROUTINE_DATA[currentRoutineKey]?.exercises.length}
              </Text>
            </View>
            <TouchableOpacity onPress={openSetupModal} style={styles.infoBtn}>
              <Feather name="info" size={20} color="#FFF" />
            </TouchableOpacity>
          </View>

          {/* Foco Body */}
          <ScrollView contentContainerStyle={styles.scrollContainerFoco}>
            
            {/* Horizontal Set Selector */}
            <View style={styles.setSelectorRow}>
              {Array.from({ length: ROUTINE_DATA[currentRoutineKey]?.exercises[currentExerciseIndex]?.totalSets || 0 }).map((_, i) => {
                const sNum = i + 1;
                return (
                  <TouchableOpacity 
                    key={sNum}
                    style={[styles.setSelectorBtn, currentSet === sNum && styles.setSelectorBtnActive]}
                    onPress={() => {
                      triggerHaptic();
                      setCurrentSet(sNum);
                    }}
                  >
                    <Text style={[styles.setSelectorBtnText, currentSet === sNum && styles.setSelectorBtnTextActive]}>
                      Set {sNum}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </View>

            {/* Steppers & Numerical Inputs */}
            <View style={[styles.inputsGrid, !isWorkoutActive && styles.inputsGridReadOnly]}>
              
              {/* Peso Stepper */}
              <View style={styles.stepperContainer}>
                <Text style={styles.inputLabel}>Peso (kg)</Text>
                <View style={styles.stepperControls}>
                  <TouchableOpacity 
                    style={styles.stepperBtn} 
                    onPress={() => updateActiveInput('weight', 'minus')}
                    disabled={!isWorkoutActive}
                  >
                    <Feather name="minus" size={16} color="#FFF" />
                  </TouchableOpacity>
                  <TextInput 
                    style={styles.stepperInput}
                    keyboardType="decimal-pad"
                    value={focoData[`${currentRoutineKey}-${currentExerciseIndex}`]?.sets?.[currentSet]?.weight || ''}
                    onChangeText={(text) => handleInputChange('weight', text)}
                    placeholder="0"
                    placeholderTextColor="#555"
                    editable={isWorkoutActive}
                    selectTextOnFocus={true}
                  />
                  <TouchableOpacity 
                    style={styles.stepperBtn} 
                    onPress={() => updateActiveInput('weight', 'plus')}
                    disabled={!isWorkoutActive}
                  >
                    <Feather name="plus" size={16} color="#FFF" />
                  </TouchableOpacity>
                </View>
              </View>

              {/* Repes Stepper */}
              <View style={styles.stepperContainer}>
                <Text style={styles.inputLabel}>Repes</Text>
                <View style={styles.stepperControls}>
                  <TouchableOpacity 
                    style={styles.stepperBtn} 
                    onPress={() => updateActiveInput('reps', 'minus')}
                    disabled={!isWorkoutActive}
                  >
                    <Feather name="minus" size={16} color="#FFF" />
                  </TouchableOpacity>
                  <TextInput 
                    style={styles.stepperInput}
                    keyboardType="number-pad"
                    value={focoData[`${currentRoutineKey}-${currentExerciseIndex}`]?.sets?.[currentSet]?.reps || ''}
                    onChangeText={(text) => handleInputChange('reps', text)}
                    placeholder="0"
                    placeholderTextColor="#555"
                    editable={isWorkoutActive}
                    selectTextOnFocus={true}
                  />
                  <TouchableOpacity 
                    style={styles.stepperBtn} 
                    onPress={() => updateActiveInput('reps', 'plus')}
                    disabled={!isWorkoutActive}
                  >
                    <Feather name="plus" size={16} color="#FFF" />
                  </TouchableOpacity>
                </View>
              </View>

              {/* RIR Stepper */}
              <View style={styles.stepperContainer}>
                <Text style={styles.inputLabel}>RIR</Text>
                <View style={styles.stepperControls}>
                  <TouchableOpacity 
                    style={styles.stepperBtn} 
                    onPress={() => updateActiveInput('rir', 'minus')}
                    disabled={!isWorkoutActive}
                  >
                    <Feather name="minus" size={16} color="#FFF" />
                  </TouchableOpacity>
                  <TextInput 
                    style={styles.stepperInput}
                    value={focoData[`${currentRoutineKey}-${currentExerciseIndex}`]?.sets?.[currentSet]?.rir || ''}
                    onChangeText={(text) => handleInputChange('rir', text)}
                    placeholder="0"
                    placeholderTextColor="#555"
                    editable={isWorkoutActive}
                    selectTextOnFocus={true}
                  />
                  <TouchableOpacity 
                    style={styles.stepperBtn} 
                    onPress={() => updateActiveInput('rir', 'plus')}
                    disabled={!isWorkoutActive}
                  >
                    <Feather name="plus" size={16} color="#FFF" />
                  </TouchableOpacity>
                </View>
              </View>

            </View>

            {/* Rest Timer Component */}
            <View style={styles.timerCard}>
              <View style={styles.timerDisplayRow}>
                <View>
                  <Text style={styles.timerDisplayTime}>{formatTimerTime(timerSecondsLeft)}</Text>
                  <Text style={styles.timerDisplayStatus}>
                    {isTimerRunning ? 'Descansando...' : 'Temporizador de Descanso'}
                  </Text>
                </View>
                <View style={styles.timerControls}>
                  <TouchableOpacity 
                    style={styles.timerControlBtn}
                    onPress={() => setIsTimerRunning(!isTimerRunning)}
                  >
                    <Feather name={isTimerRunning ? 'pause' : 'play'} size={20} color="#FFF" />
                  </TouchableOpacity>
                  <TouchableOpacity 
                    style={styles.timerControlBtn}
                    onPress={() => {
                      setIsTimerRunning(false);
                      setTimerSecondsLeft(timerInitialSeconds);
                    }}
                  >
                    <Feather name="rotate-ccw" size={20} color="#FFF" />
                  </TouchableOpacity>
                </View>
              </View>

              <View style={styles.timerPresetsRow}>
                {['1:00', '1:30', '3:00', '3:30'].map((timeLabel) => {
                  const parts = timeLabel.split(':');
                  const secs = parseInt(parts[0], 10) * 60 + parseInt(parts[1], 10);
                  return (
                    <TouchableOpacity 
                      key={timeLabel}
                      style={styles.timerPresetBtn}
                      onPress={() => {
                        triggerHaptic();
                        setIsTimerRunning(false);
                        setTimerInitialSeconds(secs);
                        setTimerSecondsLeft(secs);
                        setIsTimerRunning(true);
                      }}
                    >
                      <Text style={styles.timerPresetBtnText}>{timeLabel}</Text>
                    </TouchableOpacity>
                  );
                })}
              </View>

              <View style={styles.timerManualInputRow}>
                <TextInput 
                  style={styles.timerManualInput}
                  placeholder="Manual (MM:SS)"
                  placeholderTextColor="#666"
                  value={timerManualText}
                  onChangeText={setTimerManualText}
                />
                <TouchableOpacity 
                  style={styles.timerManualSetBtn}
                  onPress={() => {
                    triggerHaptic();
                    const parts = timerManualText.split(':');
                    if (parts.length === 2) {
                      const m = parseInt(parts[0], 10) || 0;
                      const s = parseInt(parts[1], 10) || 0;
                      const tot = m * 60 + s;
                      if (tot > 0) {
                        setIsTimerRunning(false);
                        setTimerInitialSeconds(tot);
                        setTimerSecondsLeft(tot);
                        setIsTimerRunning(true);
                      }
                    }
                  }}
                >
                  <Text style={styles.timerManualSetBtnText}>Establecer</Text>
                </TouchableOpacity>
              </View>
            </View>

            {/* Daily Exercise Notes */}
            <View style={styles.notesCard}>
              <Text style={styles.notesLabel}>Notas del Ejercicio (Día Actual)</Text>
              <TextInput 
                style={styles.notesTextarea}
                multiline={true}
                placeholder="Ej: Subir peso la próxima vez, molestias en hombro..."
                placeholderTextColor="#555"
                value={focoData[`${currentRoutineKey}-${currentExerciseIndex}`]?.notes ?? ''}
                onChangeText={(text) => handleSetupOrNotesChange('notes', text)}
              />
            </View>

            {/* Vertical Exercise Navigation */}
            <View style={styles.navigationButtonsRow}>
              <TouchableOpacity 
                style={[styles.navBtn, currentExerciseIndex === 0 && styles.navBtnDisabled]}
                disabled={currentExerciseIndex === 0}
                onPress={() => {
                  triggerHaptic();
                  flushSaveActiveSession();
                  setCurrentExerciseIndex(currentExerciseIndex - 1);
                  setCurrentSet(1);
                }}
              >
                <Feather name="arrow-left" size={16} color="#FFF" />
                <Text style={styles.navBtnText}> Anterior</Text>
              </TouchableOpacity>
              <TouchableOpacity 
                style={[
                  styles.navBtn, 
                  currentExerciseIndex === (ROUTINE_DATA[currentRoutineKey]?.exercises.length - 1) && styles.navBtnDisabled
                ]}
                disabled={currentExerciseIndex === (ROUTINE_DATA[currentRoutineKey]?.exercises.length - 1)}
                onPress={() => {
                  triggerHaptic();
                  flushSaveActiveSession();
                  setCurrentExerciseIndex(currentExerciseIndex + 1);
                  setCurrentSet(1);
                }}
              >
                <Text style={styles.navBtnText}>Siguiente </Text>
                <Feather name="arrow-right" size={16} color="#FFF" />
              </TouchableOpacity>
            </View>

          </ScrollView>
        </View>
      )}

      {/* 4. SCREEN: METRICS (DASHBOARD) */}
      {currentScreen === 'metrics' && (
        <View style={styles.screenWrapper}>
          <View style={styles.header}>
            <View>
              <Text style={styles.headerTitle}>Métricas</Text>
              <Text style={styles.headerSubtitle}>Tu progreso e historial</Text>
            </View>
          </View>

          <ScrollView contentContainerStyle={styles.scrollContainer}>
            <View style={styles.metricsGrid}>
              {Object.keys(ROUTINE_DATA).map((key) => {
                const item = ROUTINE_DATA[key];
                return (
                  <TouchableOpacity 
                    key={key} 
                    style={styles.metricRoutineBtn}
                    onPress={() => navigateToMetricDetails(key)}
                  >
                    <Text style={styles.metricRoutineTitle}>{item.title}</Text>
                    <Feather name="trending-up" size={16} color="#8A2BE2" />
                  </TouchableOpacity>
                );
              })}
            </View>

            <TouchableOpacity style={styles.btnBackup} onPress={() => Alert.alert("Backup", "Importación de backups disponible próximamente.")}>
              <Feather name="download" size={16} color="#A0A0A5" style={{ marginRight: 8 }} />
              <Text style={styles.btnBackupText}>Importar Backup</Text>
            </TouchableOpacity>
          </ScrollView>
        </View>
      )}

      {/* 5. SCREEN: METRICS DETAIL (CHRONOLOGICAL LOG) */}
      {currentScreen === 'metrics-detail' && (
        <View style={styles.screenWrapper}>
          <View style={styles.header}>
            <TouchableOpacity onPress={() => setCurrentScreen('metrics')} style={styles.backBtn}>
              <Feather name="arrow-left" size={24} color="#FFF" />
            </TouchableOpacity>
            <View style={styles.headerTitleCentered}>
              <Text style={styles.headerTitle}>{ROUTINE_DATA[currentRoutineKey]?.title}</Text>
              <Text style={styles.headerSubtitle}>Log Histórico de Entrenamientos</Text>
            </View>
            <View style={{ width: 24 }} />
          </View>

          <ScrollView contentContainerStyle={styles.scrollContainer}>
            {ROUTINE_DATA[currentRoutineKey]?.exercises.map((exercise, exerciseIdx) => (
              <View key={exerciseIdx} style={styles.metricExerciseSection}>
                <Text style={styles.metricExerciseTitle}>{exercise.name.toUpperCase()}</Text>
                
                <View style={styles.metricLogsContainer}>
                  {getHistoricalExerciseList(exerciseIdx, exercise.totalSets)}
                </View>
              </View>
            ))}
          </ScrollView>
        </View>
      )}

      {/* BOTTOM NAV BAR */}
      {(currentScreen === 'home' || currentScreen === 'metrics') && (
        <View style={styles.bottomNav}>
          <TouchableOpacity 
            style={[styles.bottomNavItem, currentScreen === 'home' && styles.bottomNavItemActive]}
            onPress={() => setCurrentScreen('home')}
          >
            <Ionicons name="barbell-outline" size={20} color={currentScreen === 'home' ? '#FFF' : '#A0A0A5'} />
            <Text style={[styles.bottomNavItemText, currentScreen === 'home' && styles.bottomNavItemTextActive]}>
              Entreno
            </Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={[styles.bottomNavItem, currentScreen === 'metrics' && styles.bottomNavItemActive]}
            onPress={() => setCurrentScreen('metrics')}
          >
            <Feather name="trending-up" size={20} color={currentScreen === 'metrics' ? '#FFF' : '#A0A0A5'} />
            <Text style={[styles.bottomNavItemText, currentScreen === 'metrics' && styles.bottomNavItemTextActive]}>
              Métricas
            </Text>
          </TouchableOpacity>
        </View>
      )}

      {/* MODAL 1: SETUP TÉCNICO (INFO) */}
      <Modal visible={isInfoModalVisible} transparent={true} animationType="fade">
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Setup Técnico</Text>
              <TouchableOpacity onPress={() => setIsInfoModalVisible(false)} style={styles.modalCloseBtn}>
                <Feather name="x" size={20} color="#FFF" />
              </TouchableOpacity>
            </View>
            
            <TextInput 
              style={styles.modalTextarea}
              multiline={true}
              placeholder="Configuración técnica del ejercicio..."
              placeholderTextColor="#555"
              value={tempSetupText}
              onChangeText={setTempSetupText}
            />
            
            <TouchableOpacity style={styles.modalSaveBtn} onPress={saveSetupModalText}>
              <Text style={styles.modalSaveBtnText}>Guardar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* MODAL 2: EDIT HISTORICAL LOG */}
      <Modal visible={isEditModalVisible} transparent={true} animationType="fade">
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle} numberOfLines={1}>
                Editar: {ROUTINE_DATA[currentRoutineKey]?.exercises[editExerciseIndex]?.name}
              </Text>
              <TouchableOpacity onPress={() => setIsEditModalVisible(false)} style={styles.modalCloseBtn}>
                <Feather name="x" size={20} color="#FFF" />
              </TouchableOpacity>
            </View>

            <ScrollView style={{ maxHeight: 350, marginVertical: 12 }}>
              {Array.from({ length: ROUTINE_DATA[currentRoutineKey]?.exercises[editExerciseIndex]?.totalSets || 0 }).map((_, i) => {
                const sNum = i + 1;
                const setData = editSets[sNum] || { weight: '', reps: '', rir: '' };
                return (
                  <View key={sNum} style={styles.editSetRow}>
                    <Text style={styles.editSetLabel}>Set {sNum}</Text>
                    <View style={styles.editSetField}>
                      <Text style={styles.editSetFieldLabel}>Peso</Text>
                      <TextInput 
                        style={styles.editSetInput}
                        keyboardType="decimal-pad"
                        value={setData.weight?.toString()}
                        onChangeText={(val) => handleEditSetInputChange(sNum, 'weight', val)}
                      />
                    </View>
                    <View style={styles.editSetField}>
                      <Text style={styles.editSetFieldLabel}>Repes</Text>
                      <TextInput 
                        style={styles.editSetInput}
                        keyboardType="number-pad"
                        value={setData.reps?.toString()}
                        onChangeText={(val) => handleEditSetInputChange(sNum, 'reps', val)}
                      />
                    </View>
                    <View style={styles.editSetField}>
                      <Text style={styles.editSetFieldLabel}>RIR</Text>
                      <TextInput 
                        style={styles.editSetInput}
                        value={setData.rir?.toString()}
                        onChangeText={(val) => handleEditSetInputChange(sNum, 'rir', val)}
                      />
                    </View>
                  </View>
                );
              })}
            </ScrollView>

            <TouchableOpacity style={styles.modalSaveBtn} onPress={saveEditLogModal}>
              <Text style={styles.modalSaveBtnText}>Guardar Cambios</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

    </SafeAreaView>
  );
}

// 6. STYLE SYSTEM (PREMIUM DARK BACKGROUND & ACCENTS)
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
  screenWrapper: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#1A1A1E',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: '900',
    color: '#FFFFFF',
    textTransform: 'uppercase',
    fontFamily: Platform.OS === 'ios' ? 'Outfit-Black' : 'normal',
  },
  headerSubtitle: {
    fontSize: 12,
    color: '#A0A0A5',
    marginTop: 2,
    fontFamily: Platform.OS === 'ios' ? 'Montserrat-Medium' : 'normal',
  },
  headerTitleCentered: {
    flex: 1,
    alignItems: 'center',
  },
  backBtn: {
    padding: 4,
  },
  syncBtn: {
    width: 42,
    height: 42,
    borderRadius: 10,
    backgroundColor: '#16161A',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#242429',
  },
  syncBtnLoading: {
    backgroundColor: '#8A2BE2',
  },
  syncBtnSuccess: {
    backgroundColor: '#4ADE80',
    borderColor: '#4ADE80',
  },
  syncBtnError: {
    backgroundColor: '#FF3333',
    borderColor: '#FF3333',
  },
  scrollContainer: {
    paddingHorizontal: 20,
    paddingTop: 12,
    paddingBottom: 80,
  },
  routineCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#101012',
    borderRadius: 12,
    padding: 18,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#242429',
  },
  routineCardActive: {
    borderColor: '#FF3333',
  },
  routineCardInfo: {
    flex: 1,
  },
  routineCardTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#FFFFFF',
    fontFamily: Platform.OS === 'ios' ? 'Outfit-Bold' : 'normal',
  },
  routineCardMeta: {
    fontSize: 12,
    color: '#A0A0A5',
    marginTop: 6,
  },
  routineCardRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  activeDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#FF3333',
  },
  actionButtonsContainer: {
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  btnStart: {
    backgroundColor: '#8A2BE2',
    borderRadius: 8,
    paddingVertical: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  btnStartText: {
    color: '#FFF',
    fontSize: 15,
    fontWeight: '800',
    textTransform: 'uppercase',
  },
  btnEnd: {
    backgroundColor: '#FF3333',
    borderRadius: 8,
    paddingVertical: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  btnEndText: {
    color: '#FFF',
    fontSize: 15,
    fontWeight: '800',
    textTransform: 'uppercase',
  },
  exerciseCard: {
    backgroundColor: '#101012',
    borderRadius: 10,
    padding: 16,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#242429',
  },
  exerciseCardReadOnly: {
    opacity: 0.8,
  },
  exerciseCardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  exerciseCardName: {
    fontSize: 16,
    fontWeight: '700',
    color: '#FFF',
    flex: 1,
    marginRight: 10,
  },
  exerciseCardNotes: {
    fontSize: 12,
    color: '#A0A0A5',
    marginTop: 6,
    fontStyle: 'italic',
  },
  homeHistoryBlock: {
    marginTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#1A1A1E',
    paddingTop: 10,
    gap: 6,
  },
  homeHistoryRow: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    gap: 6,
  },
  homeHistorySetPill: {
    backgroundColor: '#16161A',
    borderColor: '#242429',
    borderWidth: 1,
    borderRadius: 6,
    paddingHorizontal: 8,
    paddingVertical: 4,
    fontSize: 11,
    color: '#A0A0A5',
    fontFamily: Platform.OS === 'ios' ? 'Courier New' : 'monospace',
  },
  focoHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#1A1A1E',
  },
  focoTitleContainer: {
    flex: 1,
    paddingHorizontal: 12,
  },
  focoExerciseName: {
    fontSize: 18,
    fontWeight: '800',
    color: '#FFF',
  },
  focoSubtitle: {
    fontSize: 12,
    color: '#A0A0A5',
    marginTop: 2,
  },
  infoBtn: {
    padding: 4,
  },
  scrollContainerFoco: {
    paddingHorizontal: 20,
    paddingTop: 12,
    paddingBottom: 40,
  },
  setSelectorRow: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    gap: 8,
    marginBottom: 16,
  },
  setSelectorBtn: {
    backgroundColor: '#101012',
    borderWidth: 1,
    borderColor: '#242429',
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 10,
  },
  setSelectorBtnActive: {
    backgroundColor: '#8A2BE2',
    borderColor: '#8A2BE2',
  },
  setSelectorBtnText: {
    color: '#A0A0A5',
    fontSize: 13,
    fontWeight: '700',
  },
  setSelectorBtnTextActive: {
    color: '#FFF',
  },
  inputsGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 8,
    marginBottom: 16,
  },
  inputsGridReadOnly: {
    opacity: 0.5,
  },
  stepperContainer: {
    flex: 1,
    backgroundColor: '#101012',
    borderRadius: 10,
    padding: 12,
    borderWidth: 1,
    borderColor: '#242429',
    alignItems: 'center',
  },
  inputLabel: {
    fontSize: 11,
    color: '#A0A0A5',
    fontWeight: '700',
    textTransform: 'uppercase',
    marginBottom: 8,
  },
  stepperControls: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  stepperBtn: {
    width: 28,
    height: 28,
    borderRadius: 6,
    backgroundColor: '#1A1A1E',
    borderWidth: 1,
    borderColor: '#242429',
    justifyContent: 'center',
    alignItems: 'center',
  },
  stepperInput: {
    width: 42,
    height: 36,
    textAlign: 'center',
    color: '#FFF',
    fontSize: 16,
    fontWeight: '800',
    fontFamily: Platform.OS === 'ios' ? 'Courier New' : 'monospace',
    padding: 0,
  },
  timerCard: {
    backgroundColor: '#101012',
    borderRadius: 10,
    padding: 16,
    borderWidth: 1,
    borderColor: '#242429',
    marginBottom: 16,
  },
  timerDisplayRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#1A1A1E',
    paddingBottom: 12,
  },
  timerDisplayTime: {
    fontSize: 32,
    fontWeight: '900',
    color: '#FFF',
    fontFamily: Platform.OS === 'ios' ? 'Courier New' : 'monospace',
  },
  timerDisplayStatus: {
    fontSize: 11,
    color: '#A0A0A5',
    marginTop: 2,
  },
  timerControls: {
    flexDirection: 'row',
    gap: 8,
  },
  timerControlBtn: {
    width: 40,
    height: 40,
    borderRadius: 8,
    backgroundColor: '#16161A',
    borderWidth: 1,
    borderColor: '#242429',
    justifyContent: 'center',
    alignItems: 'center',
  },
  timerPresetsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 12,
    gap: 6,
  },
  timerPresetBtn: {
    flex: 1,
    backgroundColor: '#16161A',
    borderColor: '#242429',
    borderWidth: 1,
    borderRadius: 6,
    paddingVertical: 8,
    alignItems: 'center',
  },
  timerPresetBtnText: {
    color: '#A0A0A5',
    fontSize: 12,
    fontWeight: '700',
  },
  timerManualInputRow: {
    flexDirection: 'row',
    gap: 8,
  },
  timerManualInput: {
    flex: 1,
    backgroundColor: '#16161A',
    borderColor: '#242429',
    borderWidth: 1,
    borderRadius: 6,
    color: '#FFF',
    paddingHorizontal: 12,
    paddingVertical: 8,
    fontSize: 13,
  },
  timerManualSetBtn: {
    backgroundColor: '#8A2BE2',
    borderRadius: 6,
    paddingHorizontal: 16,
    justifyContent: 'center',
  },
  timerManualSetBtnText: {
    color: '#FFF',
    fontSize: 12,
    fontWeight: '800',
  },
  notesCard: {
    backgroundColor: '#101012',
    borderColor: '#242429',
    borderWidth: 1,
    borderRadius: 10,
    padding: 16,
    marginBottom: 20,
  },
  notesLabel: {
    fontSize: 12,
    color: '#A0A0A5',
    fontWeight: '700',
    marginBottom: 8,
  },
  notesTextarea: {
    minHeight: 60,
    backgroundColor: '#16161A',
    borderColor: '#242429',
    borderWidth: 1,
    borderRadius: 6,
    color: '#FFF',
    padding: 10,
    fontSize: 13,
    textAlignVertical: 'top',
  },
  navigationButtonsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 12,
  },
  navBtn: {
    flex: 1,
    backgroundColor: '#101012',
    borderWidth: 1,
    borderColor: '#242429',
    borderRadius: 8,
    paddingVertical: 12,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  navBtnDisabled: {
    opacity: 0.3,
  },
  navBtnText: {
    color: '#FFF',
    fontWeight: '700',
    fontSize: 14,
  },
  metricsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    gap: 12,
    marginBottom: 20,
  },
  metricRoutineBtn: {
    width: '47%',
    height: 100,
    backgroundColor: '#101012',
    borderWidth: 1,
    borderColor: '#242429',
    borderRadius: 12,
    padding: 16,
    justifyContent: 'space-between',
  },
  metricRoutineTitle: {
    fontSize: 15,
    fontWeight: '800',
    color: '#FFF',
    fontFamily: Platform.OS === 'ios' ? 'Outfit-Bold' : 'normal',
  },
  btnBackup: {
    borderWidth: 1,
    borderColor: '#242429',
    // borderStyle dashed + borderRadius crashes Android — using solid border
    borderRadius: 10,
    paddingVertical: 14,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
  },
  btnBackupText: {
    color: '#A0A0A5',
    fontWeight: '700',
    fontSize: 14,
  },
  metricExerciseSection: {
    marginBottom: 24,
    borderBottomWidth: 1,
    borderBottomColor: '#333337',
    // borderStyle dashed crashes Android with borderRadius — using solid
    paddingBottom: 16,
  },
  metricExerciseTitle: {
    fontSize: 15,
    fontWeight: '800',
    color: '#8A2BE2',
    marginBottom: 10,
  },
  metricLogsContainer: {
    gap: 6,
  },
  metricLogBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 4,
  },
  metricLogLabel: {
    color: '#A0A0A5',
    fontSize: 13,
    fontWeight: '600',
    fontFamily: Platform.OS === 'ios' ? 'Courier New' : 'monospace',
  },
  metricLogValue: {
    color: '#FFF',
    fontSize: 13,
    fontWeight: '600',
    fontFamily: Platform.OS === 'ios' ? 'Courier New' : 'monospace',
  },
  noHistoryText: {
    fontSize: 12,
    color: '#555',
    fontStyle: 'italic',
  },
  bottomNav: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 60,
    backgroundColor: '#050505',
    flexDirection: 'row',
    borderTopWidth: 1,
    borderTopColor: '#1A1A1E',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  bottomNavItem: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  bottomNavItemActive: {},
  bottomNavItemText: {
    fontSize: 10,
    color: '#A0A0A5',
    marginTop: 4,
  },
  bottomNavItemTextActive: {
    color: '#FFF',
    fontWeight: '700',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.85)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  modalContent: {
    width: '100%',
    backgroundColor: '#101012',
    borderColor: '#242429',
    borderWidth: 1,
    borderRadius: 12,
    padding: 20,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 14,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: '#FFF',
    flex: 1,
  },
  modalCloseBtn: {
    padding: 4,
  },
  modalTextarea: {
    minHeight: 120,
    backgroundColor: '#16161A',
    borderColor: '#242429',
    borderWidth: 1,
    borderRadius: 6,
    color: '#FFF',
    padding: 12,
    fontSize: 14,
    textAlignVertical: 'top',
    marginBottom: 16,
  },
  modalSaveBtn: {
    backgroundColor: '#8A2BE2',
    borderRadius: 8,
    paddingVertical: 12,
    alignItems: 'center',
  },
  modalSaveBtnText: {
    color: '#FFF',
    fontWeight: '800',
    fontSize: 14,
    textTransform: 'uppercase',
  },
  editSetRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#1A1A1E',
    paddingBottom: 10,
    marginBottom: 10,
  },
  editSetLabel: {
    color: '#FFF',
    fontSize: 13,
    fontWeight: '700',
    width: 48,
  },
  editSetField: {
    flex: 1,
    gap: 4,
  },
  editSetFieldLabel: {
    color: '#A0A0A5',
    fontSize: 10,
  },
  editSetInput: {
    backgroundColor: '#16161A',
    borderColor: '#242429',
    borderWidth: 1,
    borderRadius: 6,
    color: '#FFF',
    paddingHorizontal: 8,
    paddingVertical: 6,
    fontSize: 13,
    textAlign: 'center',
  }
});
