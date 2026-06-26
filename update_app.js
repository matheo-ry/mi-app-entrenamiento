const fs = require('fs');
let app = fs.readFileSync('app.js', 'utf8');

// Inject totalSets
app = app.replace(/notes:\s*"(\d+)\sserie.*?",/g, (match, num) => {
    return match + '\n                totalSets: ' + num + ',';
});

// Update openExerciseFoco
const oldStr = `    // Inicializar focoData para este ejercicio si no existe
    if (!state.focoData[index]) {
        state.focoData[index] = {
            notes: '',
            sets: {
                1: { weight: exercise.weight || 0, reps: exercise.reps || 0, rir: exercise.rir || 0 },
                2: { weight: exercise.weight || 0, reps: exercise.reps || 0, rir: exercise.rir || 0 },
                3: { weight: exercise.weight || 0, reps: exercise.reps || 0, rir: exercise.rir || 0 }
            }
        };
    }
    
    // Resetear a Serie 1
    state.currentSet = 1;
    dom.btnSets.forEach(btn => {
        if (parseInt(btn.dataset.set) === 1) btn.classList.add('active');
        else btn.classList.remove('active');
    });`;

const newStr = `    // Inicializar focoData para este ejercicio si no existe
    if (!state.focoData[index]) {
        let dynamicSets = {};
        const totalSets = exercise.totalSets || 3;
        for (let i = 1; i <= totalSets; i++) {
            dynamicSets[i] = { weight: exercise.weight || 0, reps: exercise.reps || 0, rir: exercise.rir || 0 };
        }
        
        state.focoData[index] = {
            notes: '',
            sets: dynamicSets
        };
    }
    
    // Resetear a Serie 1 y ocultar botones excedentes
    state.currentSet = 1;
    const totalSets = exercise.totalSets || 3;
    dom.btnSets.forEach(btn => {
        const setNum = parseInt(btn.dataset.set);
        if (setNum > totalSets) {
            btn.style.display = 'none';
        } else {
            btn.style.display = 'block';
        }
        if (setNum === 1) btn.classList.add('active');
        else btn.classList.remove('active');
    });`;

app = app.replace(oldStr, newStr);

fs.writeFileSync('app.js', app);
console.log("Done");
