
import React, { useRef } from 'react';
import { WebView } from 'react-native-webview';
import { StyleSheet, SafeAreaView, Platform, StatusBar } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const htmlContent = `<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
    <title>WARZONE - Minimalist Strength Log</title>
    <!-- Estilos personalizados -->
    <style>/* ==========================================
   GYM APP - ESTILOS VISUALES (v1-visual-base)
   Tema: Dark Mode Elegante y Agresivo
   Acentos: Morado Eléctrico
   ========================================== */

/* Fuentes e Inicialización */
@import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@400;600;800&family=Outfit:wght@300;400;600;700;900&display=swap');

:root {
    --bg-pure: #000000;
    --bg-card: #101012;
    --bg-card-hover: #16161a;
    --bg-input: #1a1a1e;
    --border-subtle: #242429;
    
    /* Acentos */
    --accent-purple: #8A2BE2;
    --accent-purple-glow: rgba(138, 43, 226, 0.45);
    --accent-purple-dim: rgba(138, 43, 226, 0.15);
    --accent-purple-bright: #a855f7;
    
    /* Estados */
    --accent-red: #ff3344;
    --accent-red-glow: rgba(255, 51, 68, 0.6);
    --text-primary: #ffffff;
    --text-secondary: #a3a3a3;
    --text-muted: #666666;
    
    /* Dimensiones e Interacciones */
    --font-heading: 'Outfit', sans-serif;
    --font-body: 'Outfit', sans-serif;
    --radius-lg: 16px;
    --radius-md: 12px;
    --radius-sm: 8px;
    --transition-smooth: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
    --transition-bounce: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
}

* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    -webkit-tap-highlight-color: transparent;
    user-select: none;
}

body {
    background-color: #050508;
    color: var(--text-primary);
    font-family: var(--font-body);
    min-height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    overflow: hidden;
}

/* Contenedor del dispositivo móvil (Maqueta) */
.phone-shell {
    width: 100%;
    max-width: 412px;
    height: 100vh;
    max-height: 892px; /* Altura estándar de iPhone 14 Pro / 15 Pro */
    background-color: var(--bg-pure);
    position: relative;
    overflow: hidden;
    display: flex;
    flex-direction: column;
    box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.8),
                0 0 40px 5px rgba(138, 43, 226, 0.15);
    border: 1px solid #1a1a24;
}

/* En resoluciones de escritorio simular un smartphone real */
@media (min-width: 768px) {
    .phone-shell {
        border-radius: 40px;
        border: 8px solid #1c1c24;
        height: 85vh;
        max-height: 850px;
    }
    
    /* Notch / Dynamic Island simulado en escritorio */
    .phone-shell::before {
        content: '';
        position: absolute;
        top: 10px;
        left: 50%;
        transform: translateX(-50%);
        width: 110px;
        height: 25px;
        background-color: #000;
        border-radius: 20px;
        z-index: 1000;
        pointer-events: none;
    }
}

/* Área de Contenido Principal (Viewport) */
.viewport {
    flex: 1;
    width: 100%;
    overflow-y: auto;
    overflow-x: hidden;
    position: relative;
    padding: 24px 20px 90px 20px; /* Margen inferior para no tapar la navbar */
    scrollbar-width: none; /* Firefox */
}

.viewport::-webkit-scrollbar {
    display: none; /* Safari & Chrome */
}

/* Animaciones de cambio de pantalla */
.screen {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    padding: 24px 20px 90px 20px;
    overflow-y: auto;
    scrollbar-width: none;
    display: none;
    flex-direction: column;
    animation: fadeIn 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards;
}

.screen::-webkit-scrollbar {
    display: none;
}

.screen.active {
    display: flex;
}

@keyframes fadeIn {
    from {
        opacity: 0;
        transform: scale(0.98);
    }
    to {
        opacity: 1;
        transform: scale(1);
    }
}

/* ==========================================
   COMPONENTES COMUNES
   ========================================== */

/* Cabeceras de Pantalla */
.header {
    margin-bottom: 24px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-top: 12px;
}

.header h1 {
    font-family: var(--font-heading);
    font-size: 28px;
    font-weight: 900;
    letter-spacing: -0.5px;
    text-transform: uppercase;
    background: linear-gradient(135deg, #ffffff 0%, #a3a3a3 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
}

.header .subtitle {
    font-size: 14px;
    color: var(--text-secondary);
    margin-top: 2px;
}

/* Botones y Enlaces */
.btn-icon {
    background: var(--bg-card);
    border: 1px solid var(--border-subtle);
    color: var(--text-primary);
    width: 44px;
    height: 44px;
    border-radius: var(--radius-md);
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    transition: var(--transition-smooth);
}

.btn-icon:active {
    transform: scale(0.92);
    border-color: var(--accent-purple);
    background: var(--accent-purple-dim);
}

.btn-icon i {
    width: 20px;
    height: 20px;
}

/* ==========================================
   1. BOTTOM NAVIGATION BAR
   ========================================== */
.bottom-nav {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 76px;
    background: rgba(10, 10, 12, 0.85);
    backdrop-filter: blur(20px);
    -webkit-backdrop-filter: blur(20px);
    border-top: 1px solid var(--border-subtle);
    display: flex;
    justify-content: space-around;
    align-items: center;
    padding-bottom: env(safe-area-inset-bottom);
    z-index: 100;
}

.nav-item {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    color: var(--text-muted);
    background: none;
    border: none;
    cursor: pointer;
    width: 70px;
    height: 100%;
    transition: var(--transition-smooth);
    position: relative;
}

.nav-item i {
    width: 24px;
    height: 24px;
    margin-bottom: 4px;
    transition: var(--transition-smooth);
}

.nav-item span {
    font-size: 11px;
    font-weight: 600;
    letter-spacing: 0.5px;
    text-transform: uppercase;
    transition: var(--transition-smooth);
}

/* Estado activo de la navegación */
.nav-item.active {
    color: var(--accent-purple-bright);
}

.nav-item.active i {
    transform: translateY(-2px);
    filter: drop-shadow(0 0 6px var(--accent-purple));
}

.nav-item.active::after {
    content: '';
    position: absolute;
    bottom: 8px;
    width: 16px;
    height: 3px;
    border-radius: 2px;
    background-color: var(--accent-purple-bright);
    box-shadow: 0 0 10px var(--accent-purple);
    animation: barExpand 0.3s ease forwards;
}

@keyframes barExpand {
    from { width: 0; }
    to { width: 16px; }
}

/* ==========================================
   2. VISTA HOME (ENTRENO)
   ========================================== */
.routine-list {
    display: flex;
    flex-direction: column;
    gap: 16px;
    margin-top: 10px;
}

/* Botones Grandes de Rutina */
.btn-routine {
    background-color: var(--bg-card);
    border: 1px solid var(--border-subtle);
    border-radius: var(--radius-lg);
    padding: 24px 20px;
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    cursor: pointer;
    text-align: left;
    transition: var(--transition-bounce);
    position: relative;
    overflow: hidden;
}

/* Efecto de brillo de fondo al pasar el mouse/foco */
.btn-routine::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: radial-gradient(circle at 100% 0%, var(--accent-purple-dim) 0%, transparent 70%);
    opacity: 0;
    transition: var(--transition-smooth);
}

.btn-routine:active {
    transform: scale(0.96);
    background-color: var(--bg-card-hover);
    border-color: var(--accent-purple);
}

.btn-routine:active::before {
    opacity: 1;
}

.routine-info {
    display: flex;
    flex-direction: column;
    z-index: 1;
}

.routine-title {
    font-family: var(--font-heading);
    font-size: 18px;
    font-weight: 700;
    color: var(--text-primary);
    text-transform: uppercase;
    letter-spacing: -0.2px;
}

.routine-meta {
    font-size: 12px;
    color: var(--text-secondary);
    margin-top: 4px;
    display: flex;
    align-items: center;
    gap: 4px;
}

.btn-routine i.chevron {
    color: var(--text-muted);
    width: 20px;
    height: 20px;
    transition: var(--transition-smooth);
    z-index: 1;
}

.btn-routine:active i.chevron {
    color: var(--accent-purple-bright);
    transform: translateX(4px);
}

/* Indicador de Punto Rojo Brillante */
.notification-dot {
    position: absolute;
    top: 14px;
    right: 14px;
    width: 8px;
    height: 8px;
    background-color: var(--accent-red);
    border-radius: 50%;
    box-shadow: 0 0 10px var(--accent-red), 0 0 4px var(--accent-red);
    animation: pulseRed 2s infinite;
}

@keyframes pulseRed {
    0% {
        transform: scale(1);
        box-shadow: 0 0 0 0 rgba(255, 51, 68, 0.7);
    }
    70% {
        transform: scale(1.1);
        box-shadow: 0 0 0 6px rgba(255, 51, 68, 0);
    }
    100% {
        transform: scale(1);
        box-shadow: 0 0 0 0 rgba(255, 51, 68, 0);
    }
}

/* ==========================================
   3. VISTA GENERAL (MODO PANORÁMICO DE RUTINA)
   ========================================== */
.screen-general-header {
    margin-bottom: 20px;
}

.routine-header-row {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-top: 8px;
}

/* Botón Iniciar Entreno Elegante y Destacado */
.btn-start-workout {
    background: linear-gradient(135deg, var(--accent-purple) 0%, #6a1b9a 100%);
    color: var(--text-primary);
    border: none;
    padding: 12px 20px;
    font-size: 13px;
    font-weight: 800;
    letter-spacing: 1px;
    text-transform: uppercase;
    border-radius: 20px;
    cursor: pointer;
    box-shadow: 0 4px 15px var(--accent-purple-glow);
    transition: var(--transition-bounce);
    display: flex;
    align-items: center;
    gap: 8px;
}

.btn-start-workout:active {
    transform: scale(0.94);
    box-shadow: 0 2px 8px var(--accent-purple-glow);
    filter: brightness(1.2);
}

.btn-start-workout i {
    width: 14px;
    height: 14px;
}

/* Lista de Tarjetas de Ejercicios */
.exercise-list {
    display: flex;
    flex-direction: column;
    gap: 14px;
}

.card-exercise {
    background-color: #161618;
    border: 1px solid var(--border-subtle);
    border-left: 4px solid #8A2BE2;
    border-radius: 12px;
    padding: 16px;
    cursor: pointer;
    transition: var(--transition-bounce);
    display: flex;
    flex-direction: column;
    position: relative;
    overflow: hidden;
}

.card-exercise:active {
    transform: scale(0.97);
    border-color: var(--accent-purple);
    background-color: var(--bg-card-hover);
}

.card-exercise::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 3px;
    height: 100%;
    background-color: var(--accent-purple);
    opacity: 0;
    transition: var(--transition-smooth);
}

.card-exercise:active::after {
    opacity: 1;
}

.exercise-title-row {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 12px;
    padding-bottom: 12px;
    border-bottom: 1px solid #333333;
}

.exercise-name {
    font-size: 17px;
    font-weight: 600;
    color: #FFFFFF;
}

.card-exercise i.arrow-right-icon {
    width: 16px;
    height: 16px;
    color: var(--text-muted);
    transition: var(--transition-smooth);
}

.card-exercise:active i.arrow-right-icon {
    color: var(--accent-purple-bright);
    transform: translateX(3px);
}

/* Bloque compacto del historial de las últimas 3 sesiones */
.history-block {
    background-color: #0C0C0C;
    border-radius: 8px;
    padding: 8px 12px;
    display: flex;
    flex-direction: column;
    gap: 6px;
}

.history-row {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 8px;
    font-family: monospace;
    font-size: 11px;
    color: #A0A0A0;
    line-height: 1.3;
}

.history-set {
    text-align: left;
}

/* ==========================================
   4. VISTA FOCO (LA ZONA DE GUERRA)
   ========================================== */
.screen-foco {
    padding-bottom: 20px;
    background-color: #020203; /* Aislamiento visual más oscuro */
    z-index: 200;
}

/* Animaciones de gestos (Swipe) para Vista Foco */
.screen-foco.swipe-up-anim {
    animation: slideUp 0.35s cubic-bezier(0.16, 1, 0.3, 1) forwards;
}

.screen-foco.swipe-down-anim {
    animation: slideDown 0.35s cubic-bezier(0.16, 1, 0.3, 1) forwards;
}

.screen-foco.swipe-right-anim {
    animation: slideRight 0.35s cubic-bezier(0.16, 1, 0.3, 1) forwards;
}

@keyframes slideUp {
    from { transform: translateY(100%); }
    to { transform: translateY(0); }
}

@keyframes slideDown {
    from { transform: translateY(-100%); }
    to { transform: translateY(0); }
}

@keyframes slideRight {
    from { transform: translateX(0); }
    to { transform: translateX(100%); }
}

.foco-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 30px;
    padding-top: 12px;
}

.foco-title-container {
    flex: 1;
    text-align: center;
    padding: 0 10px;
}

.foco-exercise-name {
    font-family: var(--font-heading);
    font-size: 20px;
    font-weight: 800;
    text-transform: uppercase;
    letter-spacing: -0.2px;
    color: var(--text-primary);
}

.foco-subtitle {
    font-size: 11px;
    color: var(--accent-purple-bright);
    font-weight: 700;
    letter-spacing: 1px;
    text-transform: uppercase;
    margin-top: 2px;
}

/* Panel de Notas del día anterior */
.notes-panel {
    background-color: var(--accent-purple-dim);
    border: 1px solid var(--accent-purple);
    border-radius: var(--radius-md);
    padding: 14px 16px;
    margin-bottom: 30px;
    display: none; /* Se activa mediante JS */
    animation: slideDownFade 0.3s ease forwards;
}

@keyframes slideDownFade {
    from { opacity: 0; transform: translateY(-10px); }
    to { opacity: 1; transform: translateY(0); }
}

.notes-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 6px;
    font-size: 11px;
    font-weight: 700;
    color: var(--accent-purple-bright);
    text-transform: uppercase;
    letter-spacing: 0.5px;
}

.notes-text {
    font-size: 13px;
    color: var(--text-primary);
    line-height: 1.4;
}

/* Grid de Inputs de Datos (Híbridos / Steppers) */
.data-inputs-container {
    display: flex;
    flex-direction: column;
    gap: 20px;
    margin-bottom: 35px;
}

.stepper-row {
    background-color: var(--bg-card);
    border: 1px solid var(--border-subtle);
    border-radius: var(--radius-lg);
    padding: 14px 16px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    transition: var(--transition-smooth);
}

.stepper-row:focus-within {
    border-color: var(--accent-purple);
    box-shadow: 0 0 10px rgba(138, 43, 226, 0.15);
}

.stepper-info {
    flex: 1;
}

.stepper-label {
    font-size: 11px;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 1px;
    color: var(--text-secondary);
}

.stepper-unit {
    font-size: 10px;
    color: var(--text-muted);
}

.stepper-controls {
    display: flex;
    align-items: center;
    gap: 12px;
}

.btn-stepper {
    background-color: var(--bg-input);
    border: 1px solid var(--border-subtle);
    color: var(--text-primary);
    width: 44px;
    height: 44px;
    border-radius: var(--radius-md);
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    font-size: 18px;
    font-weight: 600;
    transition: var(--transition-smooth);
}

.btn-stepper:active {
    background-color: var(--accent-purple);
    border-color: var(--accent-purple-bright);
    transform: scale(0.9);
}

.stepper-input {
    width: 75px;
    background: transparent;
    border: none;
    color: var(--text-primary);
    font-family: var(--font-heading);
    font-size: 24px;
    font-weight: 900;
    text-align: center;
    outline: none;
}

/* Eliminar flechas de número en navegadores */
.stepper-input::-webkit-outer-spin-button,
.stepper-input::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
}
.stepper-input[type=number] {
    -moz-appearance: textfield;
}

/* Sección Cronómetro en la Parte Inferior */
.timer-container {
    background-color: var(--bg-card);
    border: 1px solid var(--border-subtle);
    border-radius: var(--radius-lg);
    padding: 20px;
    margin-top: auto;
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 16px;
    box-shadow: 0 8px 30px rgba(0,0,0,0.5);
}

.timer-row {
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.timer-left {
    display: flex;
    flex-direction: column;
}

.timer-label {
    font-size: 11px;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 1px;
    color: var(--accent-purple-bright);
}

.timer-display-wrapper {
    display: flex;
    align-items: baseline;
    gap: 4px;
}

.timer-display {
    font-family: monospace;
    font-size: 40px;
    font-weight: 900;
    color: var(--text-primary);
    line-height: 1;
}

.timer-status {
    font-size: 9px;
    text-transform: uppercase;
    font-weight: 700;
    color: var(--text-muted);
}

/* Entrada Manual de Cronómetro */
.timer-manual-input {
    width: 80px;
    background: var(--bg-input);
    border: 1px solid var(--border-subtle);
    border-radius: var(--radius-sm);
    color: var(--text-primary);
    padding: 6px;
    text-align: center;
    font-family: monospace;
    font-size: 14px;
    outline: none;
    transition: var(--transition-smooth);
}

.timer-manual-input:focus {
    border-color: var(--accent-purple);
}

/* Controles Play/Pause/Reset */
.timer-controls-group {
    display: flex;
    gap: 8px;
}

.btn-timer-ctrl {
    width: 40px;
    height: 40px;
    border-radius: var(--radius-md);
    background-color: var(--bg-input);
    border: 1px solid var(--border-subtle);
    color: var(--text-primary);
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    transition: var(--transition-smooth);
}

.btn-timer-ctrl:active {
    transform: scale(0.92);
}

.btn-timer-ctrl.active {
    background-color: var(--accent-purple);
    border-color: var(--accent-purple-bright);
}

.btn-timer-ctrl i {
    width: 16px;
    height: 16px;
}

/* Fila de Botones Rápidos */
.timer-presets {
    width: 100%;
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 8px;
}

.btn-preset {
    background-color: var(--bg-input);
    border: 1px solid var(--border-subtle);
    color: var(--text-secondary);
    border-radius: var(--radius-md);
    padding: 10px 0;
    font-family: monospace;
    font-size: 13px;
    font-weight: 700;
    cursor: pointer;
    transition: var(--transition-smooth);
}

.btn-preset:active, .btn-preset.active {
    background-color: var(--accent-purple-dim);
    border-color: var(--accent-purple);
    color: var(--text-primary);
    transform: translateY(-2px);
    box-shadow: 0 4px 10px rgba(138, 43, 226, 0.15);
}

/* Indicador de Gestos Visual en la zona superior/inferior */
.swipe-indicator {
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    width: 40px;
    height: 4px;
    background-color: var(--border-subtle);
    border-radius: 2px;
    pointer-events: none;
}

.swipe-indicator.top {
    top: 8px;
}

.swipe-indicator.bottom {
    bottom: 8px;
}

/* Indicación de navegación gestual para el usuario */
.gesture-help-overlay {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: rgba(0, 0, 0, 0.85);
    border: 1px solid var(--accent-purple);
    border-radius: var(--radius-lg);
    padding: 24px;
    text-align: center;
    width: 80%;
    z-index: 1000;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 16px;
    pointer-events: none;
    opacity: 0;
    transition: opacity 0.4s ease;
}

.gesture-help-overlay.show {
    opacity: 1;
}

.gesture-help-title {
    font-weight: 700;
    color: var(--accent-purple-bright);
    font-size: 16px;
    text-transform: uppercase;
}

.gesture-help-list {
    text-align: left;
    display: flex;
    flex-direction: column;
    gap: 8px;
    font-size: 13px;
    color: var(--text-secondary);
}

.gesture-help-item i {
    color: var(--accent-purple-bright);
    margin-right: 6px;
    width: 14px;
    height: 14px;
    vertical-align: middle;
}

/* ==========================================
   5. VISTA DE METRICAS (PAGINA SECUNDARIA COMPLEMENTARIA)
   ========================================== */
.metrics-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 16px;
    margin-bottom: 20px;
}

.metric-card {
    background-color: var(--bg-card);
    border: 1px solid var(--border-subtle);
    border-radius: var(--radius-lg);
    padding: 16px;
    display: flex;
    flex-direction: column;
    gap: 8px;
}

.metric-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 11px;
    font-weight: 700;
    text-transform: uppercase;
    color: var(--text-secondary);
    letter-spacing: 0.5px;
}

.metric-value {
    font-size: 24px;
    font-weight: 800;
    color: var(--text-primary);
}

.metric-change {
    font-size: 11px;
    font-weight: 600;
    color: var(--accent-purple-bright);
    display: flex;
    align-items: center;
    gap: 2px;
}

.chart-placeholder {
    grid-column: span 2;
    background-color: var(--bg-card);
    border: 1px solid var(--border-subtle);
    border-radius: var(--radius-lg);
    padding: 20px;
    height: 180px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
}

.chart-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.chart-title {
    font-size: 13px;
    font-weight: 700;
    text-transform: uppercase;
    color: var(--text-primary);
}

.chart-bars {
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
    height: 90px;
    padding-top: 10px;
}

.chart-bar-wrapper {
    display: flex;
    flex-direction: column;
    align-items: center;
    flex: 1;
    gap: 6px;
}

.chart-bar {
    width: 20px;
    background: linear-gradient(180deg, var(--accent-purple-bright) 0%, var(--accent-purple) 100%);
    border-radius: 4px;
    box-shadow: 0 0 10px rgba(138, 43, 226, 0.2);
    min-height: 5px;
    transition: height 0.6s cubic-bezier(0.16, 1, 0.3, 1);
}

.chart-bar-label {
    font-size: 9px;
    color: var(--text-muted);
    text-transform: uppercase;
    font-weight: 700;
}

/* Estado de Entrenamiento Activo (Dimmed) */
.btn-start-workout.active-workout {
    background: #1e1e24 !important;
    color: var(--text-secondary) !important;
    border: 1px solid var(--border-subtle) !important;
    box-shadow: none !important;
}

/* ==========================================
   NUEVA UX VISTA FOCO (Selector de Series, Notas, Info Modal)
   ========================================== */

/* Selector de Series */
.set-selector-container {
    display: flex;
    justify-content: space-between;
    background-color: #101012;
    border-radius: 12px;
    padding: 6px;
    margin-bottom: 30px;
    border: 1px solid #242429;
}

.btn-set {
    flex: 1;
    padding: 12px 0;
    text-align: center;
    background: transparent;
    border: none;
    border-radius: 8px;
    color: #a3a3a3;
    font-weight: 700;
    font-size: 14px;
    text-transform: uppercase;
    cursor: pointer;
    transition: var(--transition-smooth);
}

.btn-set.active {
    background-color: #8A2BE2;
    color: #FFFFFF;
    box-shadow: 0 0 15px rgba(138, 43, 226, 0.4);
}

/* Notas del Día Persistentes */
.persistent-notes-container {
    margin-top: 25px;
    margin-bottom: 25px;
}

.persistent-notes-label {
    color: #a3a3a3;
    font-size: 12px;
    font-weight: 700;
    letter-spacing: 1px;
    margin-bottom: 12px;
    text-transform: uppercase;
}

.persistent-notes-input {
    width: 100%;
    background-color: #101012;
    border: 1px solid #242429;
    border-radius: 12px;
    color: #FFFFFF;
    font-family: var(--font-body);
    font-size: 15px;
    padding: 16px;
    min-height: 100px;
    resize: none;
    outline: none;
}

.persistent-notes-input:focus {
    border-color: #8A2BE2;
    box-shadow: 0 0 10px rgba(138, 43, 226, 0.15);
}

/* Modal Info (Setup Técnico) */
.modal-overlay {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.85);
    z-index: 1000;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 20px;
    opacity: 0;
    pointer-events: none;
    transition: var(--transition-smooth);
}

.modal-overlay.show {
    opacity: 1;
    pointer-events: all;
}

.modal-content {
    width: 100%;
    background-color: #161618;
    border-radius: 20px;
    padding: 24px;
    border: 1px solid #8A2BE2;
    box-shadow: 0 10px 30px rgba(138, 43, 226, 0.2);
    transform: scale(0.95);
    transition: var(--transition-bounce);
}

.modal-overlay.show .modal-content {
    transform: scale(1);
}

.modal-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;
    border-bottom: 1px solid #242429;
    padding-bottom: 15px;
}

.modal-title {
    color: #FFFFFF;
    font-size: 18px;
    font-weight: 800;
    text-transform: uppercase;
}

.btn-close-modal {
    background: transparent;
    border: none;
    color: #a3a3a3;
    cursor: pointer;
    padding: 4px;
}

.btn-close-modal i {
    width: 24px;
    height: 24px;
}

.modal-text {
    color: #E0E0E0;
    font-size: 15px;
    line-height: 1.6;
}

.modal-textarea {
    width: 100%;
    background-color: #101012;
    border: 1px solid #242429;
    border-radius: 12px;
    color: #FFFFFF;
    font-family: inherit;
    font-size: 15px;
    padding: 16px;
    min-height: 140px;
    resize: none;
    outline: none;
    line-height: 1.6;
    margin-top: 10px;
}

.modal-textarea:focus {
    border-color: #8A2BE2;
    box-shadow: 0 0 10px rgba(138, 43, 226, 0.15);
}

/* Historial Reciente en Vista Foco */
.history-panel-foco {
    background: rgba(22, 22, 24, 0.6);
    border: 1px solid #242429;
    border-radius: 16px;
    padding: 12px 14px;
    margin: 0px 20px 15px 20px;
    backdrop-filter: blur(10px);
}

.history-panel-title {
    color: #a3a3a3;
    font-size: 11px;
    font-weight: 800;
    text-transform: uppercase;
    letter-spacing: 1.5px;
    margin-bottom: 8px;
}

.history-list-foco {
    display: flex;
    flex-direction: column;
    gap: 8px;
}

.history-item-foco {
    display: flex;
    flex-direction: column;
    border-bottom: 1px solid rgba(36, 36, 41, 0.5);
    padding-bottom: 6px;
}

.history-item-foco:last-child {
    border-bottom: none;
    padding-bottom: 0;
}

.history-row-main {
    display: flex;
    align-items: center;
    justify-content: space-between;
}

.history-date-wrapper {
    display: flex;
    align-items: center;
    gap: 6px;
}

.history-date {
    color: #FFFFFF;
    font-size: 13px;
    font-weight: 700;
}

.history-bell-btn {
    background: none;
    border: none;
    color: #8A2BE2;
    cursor: pointer;
    padding: 2px;
    display: flex;
    align-items: center;
    justify-content: center;
}

.history-bell-btn i {
    width: 14px;
    height: 14px;
}

.history-sets-summary {
    display: flex;
    gap: 8px;
    color: #E0E0E0;
    font-size: 13px;
    font-weight: 500;
}

.history-set-pill {
    background-color: #101012;
    border: 1px solid #242429;
    padding: 2px 6px;
    border-radius: 6px;
    font-family: monospace;
    font-size: 11px;
}

.history-note-expanded {
    display: none;
    background: #101012;
    border: 1px solid #8A2BE2;
    border-radius: 8px;
    padding: 8px 12px;
    margin-top: 6px;
    color: #a3a3a3;
    font-size: 12px;
    line-height: 1.4;
}

.history-note-expanded.show {
    display: block;
}

/* Botón Sincronizar Google Sheets Premium */
.sync-container-home {
    margin: 25px 20px 20px 20px;
    display: flex;
    justify-content: center;
}

.btn-sync-premium {
    width: 100%;
    background: linear-gradient(135deg, #8A2BE2, #4B0082);
    border: 1px solid rgba(138, 43, 226, 0.4);
    border-radius: 14px;
    color: #FFFFFF;
    font-family: inherit;
    font-size: 15px;
    font-weight: 700;
    padding: 16px;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 10px;
    cursor: pointer;
    box-shadow: 0 4px 15px rgba(138, 43, 226, 0.2);
    transition: all var(--transition-smooth);
}

.btn-sync-premium:active {
    transform: scale(0.98);
    opacity: 0.9;
}

.btn-sync-premium.loading {
    background: #161618 !important;
    border-color: #242429 !important;
    color: #a3a3a3 !important;
    pointer-events: none !important;
    box-shadow: none !important;
}

/* Spinner CSS */
.spinner {
    width: 18px;
    height: 18px;
    border: 2.5px solid #a3a3a3;
    border-top: 2.5px solid #8A2BE2;
    border-radius: 50%;
    animation: spin 1s linear infinite;
}

@keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
}
</style>
</head>
<body>

    <!-- Contenedor del Dispositivo Móvil -->
    <div class="phone-shell">
        
        <!-- PANTALLA 1: HOME ("ENTRENO") -->
        <section id="screen-entreno" class="screen active">
            <header class="header">
                <div>
                    <h1>Entreno</h1>
                    <div class="subtitle">Selecciona una rutina para hoy</div>
                </div>
                <button class="btn-icon" id="btn-theme-info">
                    <i data-lucide="zap"></i>
                </button>
            </header>

            <div class="routine-list">
                <!-- Botón Rutina 1 -->
                <button class="btn-routine" data-routine="pecho-espalda">
                    <div class="routine-info">
                        <span class="routine-title">Pecho / Espalda</span>
                        <span class="routine-meta"><i data-lucide="dumbbell" style="width: 12px; height: 12px;"></i> 8 ejercicios</span>
                    </div>
                    <i data-lucide="chevron-right" class="chevron"></i>
                    <!-- Detalle UI: Punto rojo brillante -->
                    <div class="notification-dot"></div>
                </button>

                <!-- Botón Rutina 2 -->
                <button class="btn-routine" data-routine="brazo-pierna-1">
                    <div class="routine-info">
                        <span class="routine-title">Brazo / Pierna 1</span>
                        <span class="routine-meta"><i data-lucide="dumbbell" style="width: 12px; height: 12px;"></i> 8 ejercicios</span>
                    </div>
                    <i data-lucide="chevron-right" class="chevron"></i>
                </button>

                <!-- Botón Rutina 3 -->
                <button class="btn-routine" data-routine="espalda-pecho">
                    <div class="routine-info">
                        <span class="routine-title">Espalda / Pecho</span>
                        <span class="routine-meta"><i data-lucide="dumbbell" style="width: 12px; height: 12px;"></i> 8 ejercicios</span>
                    </div>
                    <i data-lucide="chevron-right" class="chevron"></i>
                </button>

                <!-- Botón Rutina 4 -->
                <button class="btn-routine" data-routine="brazo-pierna-2">
                    <div class="routine-info">
                        <span class="routine-title">Brazo / Pierna 2</span>
                        <span class="routine-meta"><i data-lucide="dumbbell" style="width: 12px; height: 12px;"></i> 8 ejercicios</span>
                    </div>
                    <i data-lucide="chevron-right" class="chevron"></i>
                </button>
            </div>

            <!-- Botón de Sincronización Manual Premium -->
            <div class="sync-container-home">
                <button class="btn-sync-premium" id="btn-sync-sheets-manual">
                    <i data-lucide="cloud-lightning"></i>
                    <span>Sincronizar Datos</span>
                </button>
            </div>
        </section>

        <!-- PANTALLA 2: METRICAS -->
        <section id="screen-metricas" class="screen">
            <header class="header">
                <div>
                    <h1>Métricas</h1>
                    <div class="subtitle">Tu progreso e historial</div>
                </div>
            </header>

            <div class="metrics-grid">
                <div class="metric-card">
                    <div class="metric-header">
                        <span>Sesiones</span>
                        <i data-lucide="calendar" style="width: 14px; height: 14px; color: var(--accent-purple-bright);"></i>
                    </div>
                    <div class="metric-value">24</div>
                    <div class="metric-change">Este mes</div>
                </div>

                <div class="metric-card">
                    <div class="metric-header">
                        <span>Volumen</span>
                        <i data-lucide="trending-up" style="width: 14px; height: 14px; color: var(--accent-purple-bright);"></i>
                    </div>
                    <div class="metric-value">42.8t</div>
                    <div class="metric-change">+12% vs prev.</div>
                </div>

                <div class="chart-placeholder">
                    <div class="chart-header">
                        <span class="chart-title">Consistencia Semanal</span>
                        <i data-lucide="bar-chart-2" style="width: 14px; height: 14px; color: var(--accent-purple-bright);"></i>
                    </div>
                    <div class="chart-bars">
                        <div class="chart-bar-wrapper">
                            <div class="chart-bar" style="height: 40px;"></div>
                            <span class="chart-bar-label">Sem 1</span>
                        </div>
                        <div class="chart-bar-wrapper">
                            <div class="chart-bar" style="height: 60px;"></div>
                            <span class="chart-bar-label">Sem 2</span>
                        </div>
                        <div class="chart-bar-wrapper">
                            <div class="chart-bar" style="height: 80px;"></div>
                            <span class="chart-bar-label">Sem 3</span>
                        </div>
                        <div class="chart-bar-wrapper">
                            <div class="chart-bar" style="height: 70px;"></div>
                            <span class="chart-bar-label">Sem 4</span>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <!-- VISTA GENERAL (PANTALLA DESLIZANTE DE DETALLE DE RUTINA) -->
        <section id="screen-general" class="screen" style="z-index: 150; background-color: var(--bg-pure);">
            <div class="screen-general-header">
                <button class="btn-icon" id="btn-back-to-home">
                    <i data-lucide="arrow-left"></i>
                </button>
                <div class="routine-header-row">
                    <div>
                        <h1 id="routine-general-title">Pecho / Espalda</h1>
                        <span class="subtitle">Lista de Ejercicios</span>
                    </div>
                    <!-- Botón Destacado: INICIAR ENTRENO -->
                    <button class="btn-start-workout" id="btn-start-workout">
                        <i data-lucide="play"></i>
                        <span>Iniciar Entreno</span>
                    </button>
                </div>
            </div>

            <!-- ScrollView de Tarjetas de Ejercicio -->
            <div class="exercise-list" id="exercise-list-container">
                <!-- Se poblará dinámicamente desde app.js para mantener consistencia -->
            </div>
        </section>

        <!-- VISTA FOCO (PANTALLA COMPLETA - LA ZONA DE GUERRA) -->
        <section id="screen-foco" class="screen">
            <div class="foco-header">
                <button class="btn-icon" id="btn-back-to-general">
                    <i data-lucide="arrow-left"></i>
                </button>
                <div class="foco-title-container">
                    <div class="foco-exercise-name" id="foco-exercise-name">Press Horizontal</div>
                    <div class="foco-subtitle" id="foco-exercise-index">Ejercicio 1 de 4</div>
                </div>
                <!-- Icono de Setup Técnico (Info) -->
                <button class="btn-icon" id="btn-info-modal" title="Setup Técnico">
                    <i data-lucide="info"></i>
                </button>
            </div>

            <!-- Historial de Rendimiento (Acceso Instantáneo) -->
            <div class="history-panel-foco">
                <div class="history-panel-title">Historial Reciente</div>
                <div id="foco-history-list" class="history-list-foco">
                    <!-- Se poblará dinámicamente -->
                </div>
            </div>

            <!-- Selector de Series (Sets Tracker) -->
            <div class="set-selector-container">
                <!-- Se poblará dinámicamente desde app.js -->
            </div>



            <!-- Grid de Inputs Híbridos (Steppers) -->
            <div class="data-inputs-container">
                <!-- Stepper 1: PESO -->
                <div class="stepper-row">
                    <div class="stepper-info">
                        <div class="stepper-label">Peso</div>
                        <span class="stepper-unit">Kilogramos (kg)</span>
                    </div>
                    <div class="stepper-controls">
                        <button class="btn-stepper" id="btn-weight-minus">-</button>
                        <input type="number" class="stepper-input" id="input-weight" placeholder="0" value="" step="2.5" inputmode="decimal">
                        <button class="btn-stepper" id="btn-weight-plus">+</button>
                    </div>
                </div>

                <!-- Stepper 2: REPES -->
                <div class="stepper-row">
                    <div class="stepper-info">
                        <div class="stepper-label">Repeticiones</div>
                        <span class="stepper-unit">Contador (repes)</span>
                    </div>
                    <div class="stepper-controls">
                        <button class="btn-stepper" id="btn-reps-minus">-</button>
                        <input type="number" class="stepper-input" id="input-reps" placeholder="0" value="" step="1" inputmode="numeric">
                        <button class="btn-stepper" id="btn-reps-plus">+</button>
                    </div>
                </div>

                <!-- Stepper 3: RIR -->
                <div class="stepper-row">
                    <div class="stepper-info">
                        <div class="stepper-label">RIR</div>
                        <span class="stepper-unit">Reps en Reserva</span>
                    </div>
                    <div class="stepper-controls">
                        <button class="btn-stepper" id="btn-rir-minus">-</button>
                        <input type="text" class="stepper-input" id="input-rir" placeholder="0" value="" step="1" inputmode="numeric">
                        <button class="btn-stepper" id="btn-rir-plus">+</button>
                    </div>
                </div>
            </div>

            <!-- Módulo de Cronómetro (Parte Inferior) -->
            <div class="timer-container">
                <div class="timer-row">
                    <div class="timer-left">
                        <span class="timer-label">Cronómetro</span>
                        <div class="timer-display-wrapper">
                            <span class="timer-display" id="timer-display">00:00</span>
                        </div>
                        <span class="timer-status" id="timer-status">Descanso listo</span>
                    </div>
                    
                    <!-- Entrada manual, controles -->
                    <div style="display: flex; flex-direction: column; align-items: flex-end; gap: 8px;">
                        <input type="text" class="timer-manual-input" id="timer-manual" placeholder="01:30" title="Entrada manual (MM:SS)">
                        <div class="timer-controls-group">
                            <button class="btn-timer-ctrl" id="btn-timer-play" title="Iniciar/Pausar">
                                <i data-lucide="play"></i>
                            </button>
                            <button class="btn-timer-ctrl" id="btn-timer-reset" title="Reiniciar">
                                <i data-lucide="rotate-ccw"></i>
                            </button>
                        </div>
                    </div>
                </div>

                <!-- Botones rápidos predeterminados -->
                <div class="timer-presets">
                    <button class="btn-preset" data-seconds="60">1:00</button>
                    <button class="btn-preset" data-seconds="90">1:30</button>
                    <button class="btn-preset" data-seconds="180">3:00</button>
                    <button class="btn-preset" data-seconds="210">3:30</button>
                </div>
            </div>

            <!-- Notas del Día Persistentes -->
            <div class="persistent-notes-container">
                <div class="persistent-notes-label">Notas del Ejercicio (Día Actual)</div>
                <textarea class="persistent-notes-input" id="input-daily-notes" placeholder="Ej: Subir peso la próxima vez, molestias en hombro..."></textarea>
            </div>

            </section>

        <!-- Barra de Navegación Inferior Minimalista -->
        <nav class="bottom-nav" id="main-nav">
            <button class="nav-item active" data-target="screen-entreno">
                <i data-lucide="dumbbell"></i>
                <span>Entreno</span>
            </button>
            <button class="nav-item" data-target="screen-metricas">
                <i data-lucide="trending-up"></i>
                <span>Métricas</span>
            </button>
        </nav>



    </div>

    <!-- Modal de Setup Técnico (Info) -->
    <div class="modal-overlay" id="info-modal">
        <div class="modal-content">
            <div class="modal-header">
                <span class="modal-title">Setup Técnico</span>
                <button class="btn-close-modal" id="btn-close-info-modal">
                    <i data-lucide="x"></i>
                </button>
            </div>
            <textarea class="modal-textarea" id="info-modal-text" placeholder="Escribe aquí el setup técnico (posición, agarre, altura del asiento...)"></textarea>
        </div>
    </div>

    <!-- Cargar Iconos de Lucide -->
    <script src="https://unpkg.com/lucide@latest"></script>
    <!-- Lógica de la Aplicación -->
    <script>/* ==========================================
   GYM APP - LÓGICA DE APLICACIÓN (v1-visual-base)
   Navegación, Steppers, Cronómetro y Gestos
   ========================================== */

// 1. ESTRUCTURA DE DATOS MOCK DE RUTINAS Y EJERCICIOS
const ROUTINE_DATA = {
    "pecho-espalda": {
        title: "Pecho / Espalda",
        exercises: [
            {
                name: "Press Horizontal en máquina",
                history: [
                    "90x10(1) 90x10(1) 90x9(0)",
                    "95x9(1) 95x8(1) 95x8(0) | Muy cansado de hombro posterior",
                    "95x10(1) 95x9(1) 95x8(0) | Asiento en altura 4, empuje explosivo y retracción escapular"
                ],
                notes: "3 series.",
                totalSets: 3,
                weight: 0, reps: 0, rir: 0
            },
            {
                name: "Press Inclinado",
                history: [
                    "70x10(1) 70x9(0)",
                    "75x8(1) 75x8(0)",
                    "75x9(1) 75x8(0) | Buen ángulo de banco, sin dolor"
                ],
                notes: "2 series.",
                totalSets: 2,
                weight: 0, reps: 0, rir: 0
            },
            {
                name: "Aperturas en polea sentado",
                history: [
                    "15x15(1) 15x14(0)",
                    "17.5x12(1) 17.5x12(0)",
                    "17.5x13(1) 17.5x12(0)"
                ],
                notes: "2 series.",
                totalSets: 2,
                weight: 0, reps: 0, rir: 0
            },
            {
                name: "Remo en T",
                history: [
                    "60x10(1) 60x10(1) 60x9(0)",
                    "65x8(1) 65x8(1) 65x7(0)",
                    "65x9(1) 65x8(1) 65x8(0)"
                ],
                notes: "3 series.",
                totalSets: 3,
                weight: 0, reps: 0, rir: 0
            },
            {
                name: "Jalón Dorsal Plano Frontal",
                history: [
                    "50x12(1) 50x11(0)",
                    "55x10(1) 55x9(0)",
                    "55x11(1) 55x10(0)"
                ],
                notes: "2 series.",
                totalSets: 2,
                weight: 0, reps: 0, rir: 0
            },
            {
                name: "Jalón Dorsal Plano Sagital",
                history: [
                    "45x12(1) 45x11(0)",
                    "50x10(1) 50x9(0)",
                    "50x10(1) 50x10(0)"
                ],
                notes: "2 series.",
                totalSets: 2,
                weight: 0, reps: 0, rir: 0
            },
            {
                name: "Laterales en polea (Hombro)",
                history: [
                    "10x15(1) 10x15(0)",
                    "12.5x12(1) 12.5x12(0)",
                    "12.5x13(1) 12.5x12(0)"
                ],
                notes: "2 series.",
                totalSets: 2,
                weight: 0, reps: 0, rir: 0
            },
            {
                name: "Hombro Posterior",
                history: [
                    "10x15(0)",
                    "12.5x12(0)",
                    "12.5x13(0)"
                ],
                notes: "1 serie.",
                totalSets: 1,
                weight: 0, reps: 0, rir: 0
            }
        ]
    },
    "brazo-pierna-1": {
        title: "Brazo / Pierna 1",
        exercises: [
            {
                name: "Press Francés",
                history: [
                    "30x12(1) 30x11(0)",
                    "35x10(1) 35x9(0)",
                    "35x11(1) 35x10(0)"
                ],
                notes: "2 series.",
                totalSets: 2,
                weight: 0, reps: 0, rir: 0
            },
            {
                name: "Extensión de tríceps en polea",
                history: [
                    "20x15(1) 20x14(1) 20x14(0)",
                    "25x12(1) 25x12(1) 25x11(0)",
                    "25x13(1) 25x12(1) 25x12(0)"
                ],
                notes: "3 series.",
                totalSets: 3,
                weight: 0, reps: 0, rir: 0
            },
            {
                name: "Curl Banco Scott Unilateral",
                history: [
                    "15x12(1) 15x11(1) 15x10(0)",
                    "17.5x10(1) 17.5x9(1) 17.5x9(0)",
                    "17.5x11(1) 17.5x10(1) 17.5x9(0) | Foco en estiramiento total"
                ],
                notes: "3 series.",
                totalSets: 3,
                weight: 0, reps: 0, rir: 0
            },
            {
                name: "Martillo en polea",
                history: [
                    "25x12(1) 25x11(0)",
                    "30x10(1) 30x9(0)",
                    "30x11(1) 30x10(0)"
                ],
                notes: "2 series.",
                totalSets: 2,
                weight: 0, reps: 0, rir: 0
            },
            {
                name: "Elevaciones laterales",
                history: [
                    "12x15(1) 12x14(0)",
                    "14x12(1) 14x12(0)",
                    "14x13(1) 14x12(0)"
                ],
                notes: "2 series.",
                totalSets: 2,
                weight: 0, reps: 0, rir: 0
            },
            {
                name: "Extensión de cuádriceps",
                history: [
                    "60x15(1) 60x14(1) 60x14(0)",
                    "65x12(1) 65x12(1) 65x11(0)",
                    "65x13(1) 65x12(1) 65x12(0)"
                ],
                notes: "3 series.",
                totalSets: 3,
                weight: 0, reps: 0, rir: 0
            },
            {
                name: "Sentadilla Péndulo",
                history: [
                    "100x12(1) 100x11(0)",
                    "110x10(1) 110x9(0)",
                    "110x11(1) 110x10(0)"
                ],
                notes: "2 series.",
                totalSets: 2,
                weight: 0, reps: 0, rir: 0
            },
            {
                name: "Curl Femoral Sentado",
                history: [
                    "50x12(1) 50x11(0)",
                    "55x10(1) 55x9(0)",
                    "55x11(1) 55x10(0)"
                ],
                notes: "2 series.",
                totalSets: 2,
                weight: 0, reps: 0, rir: 0
            }
        ]
    },
    "espalda-pecho": {
        title: "Espalda / Pecho",
        exercises: [
            {
                name: "Remo en T",
                history: [
                    "60x10(1) 60x10(1) 60x9(0)",
                    "65x8(1) 65x8(1) 65x7(0)",
                    "65x9(1) 65x8(1) 65x8(0)"
                ],
                notes: "3 series.",
                totalSets: 3,
                weight: 0, reps: 0, rir: 0
            },
            {
                name: "Jalón Dorsal Plano Frontal",
                history: [
                    "50x12(1) 50x11(0)",
                    "55x10(1) 55x9(0)",
                    "55x11(1) 55x10(0)"
                ],
                notes: "2 series.",
                totalSets: 2,
                weight: 0, reps: 0, rir: 0
            },
            {
                name: "Jalón Dorsal Plano Sagital",
                history: [
                    "45x12(1) 45x11(0)",
                    "50x10(1) 50x9(0)",
                    "50x10(1) 50x10(0)"
                ],
                notes: "2 series.",
                totalSets: 2,
                weight: 0, reps: 0, rir: 0
            },
            {
                name: "Press Horizontal en máquina",
                history: [
                    "90x10(1) 90x10(0)",
                    "95x8(1) 95x8(0)",
                    "95x9(1) 95x8(0)"
                ],
                notes: "2 series.",
                totalSets: 2,
                weight: 0, reps: 0, rir: 0
            },
            {
                name: "Press Inclinado",
                history: [
                    "70x10(1) 70x9(0)",
                    "75x8(1) 75x8(0)",
                    "75x9(1) 75x8(0)"
                ],
                notes: "2 series.",
                totalSets: 2,
                weight: 0, reps: 0, rir: 0
            },
            {
                name: "Aperturas en polea sentado",
                history: [
                    "15x15(1) 15x14(0)",
                    "17.5x12(1) 17.5x12(0)",
                    "17.5x13(1) 17.5x12(0)"
                ],
                notes: "2 series.",
                totalSets: 2,
                weight: 0, reps: 0, rir: 0
            },
            {
                name: "Laterales en polea (Hombro)",
                history: [
                    "10x15(1) 10x15(0)",
                    "12.5x12(1) 12.5x12(0)",
                    "12.5x13(1) 12.5x12(0)"
                ],
                notes: "2 series.",
                totalSets: 2,
                weight: 0, reps: 0, rir: 0
            },
            {
                name: "Hombro Posterior",
                history: [
                    "10x15(0)",
                    "12.5x12(0)",
                    "12.5x13(0)"
                ],
                notes: "1 serie.",
                totalSets: 1,
                weight: 0, reps: 0, rir: 0
            }
        ]
    },
    "brazo-pierna-2": {
        title: "Brazo / Pierna 2",
        exercises: [
            {
                name: "Press Francés",
                history: [
                    "30x12(1) 30x11(0)",
                    "35x10(1) 35x9(0)",
                    "35x11(1) 35x10(0)"
                ],
                notes: "2 series.",
                totalSets: 2,
                weight: 0, reps: 0, rir: 0
            },
            {
                name: "Extensión de tríceps en polea",
                history: [
                    "20x15(1) 20x14(1) 20x14(0)",
                    "25x12(1) 25x12(1) 25x11(0)",
                    "25x13(1) 25x12(1) 25x12(0)"
                ],
                notes: "3 series.",
                totalSets: 3,
                weight: 0, reps: 0, rir: 0
            },
            {
                name: "Curl Banco Scott Unilateral",
                history: [
                    "15x12(1) 15x11(1) 15x10(0)",
                    "17.5x10(1) 17.5x9(1) 17.5x9(0)",
                    "17.5x11(1) 17.5x10(1) 17.5x9(0)"
                ],
                notes: "3 series.",
                totalSets: 3,
                weight: 0, reps: 0, rir: 0
            },
            {
                name: "Martillo en polea",
                history: [
                    "25x12(1) 25x11(0)",
                    "30x10(1) 30x9(0)",
                    "30x11(1) 30x10(0)"
                ],
                notes: "2 series.",
                totalSets: 2,
                weight: 0, reps: 0, rir: 0
            },
            {
                name: "Elevaciones laterales",
                history: [
                    "12x15(1) 12x14(0)",
                    "14x12(1) 14x12(0)",
                    "14x13(1) 14x12(0)"
                ],
                notes: "2 series.",
                totalSets: 2,
                weight: 0, reps: 0, rir: 0
            },
            {
                name: "Extensión de cuádriceps",
                history: [
                    "60x15(1) 60x14(1) 60x14(0)",
                    "65x12(1) 65x12(1) 65x11(0)",
                    "65x13(1) 65x12(1) 65x12(0)"
                ],
                notes: "3 series.",
                totalSets: 3,
                weight: 0, reps: 0, rir: 0
            },
            {
                name: "Sentadilla Péndulo",
                history: [
                    "100x12(1) 100x11(0)",
                    "110x10(1) 110x9(0)",
                    "110x11(1) 110x10(0)"
                ],
                notes: "2 series.",
                totalSets: 2,
                weight: 0, reps: 0, rir: 0
            },
            {
                name: "Curl Femoral Sentado",
                history: [
                    "50x12(1) 50x11(0)",
                    "55x10(1) 55x9(0)",
                    "55x11(1) 55x10(0)"
                ],
                notes: "2 series.",
                totalSets: 2,
                weight: 0, reps: 0, rir: 0
            }
        ]
    }
};

// 2. ESTADO GLOBAL DE LA APLICACIÓN
const state = {
    currentTab: 'screen-entreno',
    currentRoutineKey: null,
    currentExerciseIndex: 0,
    isWorkoutActive: false,
    currentSet: 1,
    // Estructura: focoData[exerciseIndex] = { notes: '', sets: { 1: {weight, reps, rir}, 2: {}, 3: {} } }
    focoData: {}
};

// 3. REFERENCIAS DEL DOM
const dom = {
    // Pantallas principales
    screens: {
        entreno: document.getElementById('screen-entreno'),
        metricas: document.getElementById('screen-metricas'),
        general: document.getElementById('screen-general'),
        foco: document.getElementById('screen-foco')
    },
    // Elementos de Navegación
    navBar: document.getElementById('main-nav'),
    navItems: document.querySelectorAll('.nav-item'),
    
    // Vista General
    btnBackToHome: document.getElementById('btn-back-to-home'),
    routineGeneralTitle: document.getElementById('routine-general-title'),
    exerciseListContainer: document.getElementById('exercise-list-container'),
    btnStartWorkout: document.getElementById('btn-start-workout'),
    
    // Vista Foco (Zona de Guerra)
    btnBackToGeneral: document.getElementById('btn-back-to-general'),
    focoExerciseName: document.getElementById('foco-exercise-name'),
    focoExerciseIndex: document.getElementById('foco-exercise-index'),
    
    // Nueva UX Vista Foco
    btnInfoModal: document.getElementById('btn-info-modal'),
    infoModal: document.getElementById('info-modal'),
    btnCloseInfoModal: document.getElementById('btn-close-info-modal'),
    infoModalText: document.getElementById('info-modal-text'),
    btnSets: document.querySelectorAll('.btn-set'),
    inputDailyNotes: document.getElementById('input-daily-notes'),
    
    // Steppers de Vista Foco
    inputs: {
        weight: document.getElementById('input-weight'),
        reps: document.getElementById('input-reps'),
        rir: document.getElementById('input-rir')
    },
    buttons: {
        weightMinus: document.getElementById('btn-weight-minus'),
        weightPlus: document.getElementById('btn-weight-plus'),
        repsMinus: document.getElementById('btn-reps-minus'),
        repsPlus: document.getElementById('btn-reps-plus'),
        rirMinus: document.getElementById('btn-rir-minus'),
        rirPlus: document.getElementById('btn-rir-plus')
    },
    
    // Cronómetro
    timerDisplay: document.getElementById('timer-display'),
    timerStatus: document.getElementById('timer-status'),
    timerManual: document.getElementById('timer-manual'),
    btnTimerPlay: document.getElementById('btn-timer-play'),
    btnTimerReset: document.getElementById('btn-timer-reset'),
    timerPresets: document.querySelectorAll('.btn-preset')
};

// 4. CRONÓMETRO VARIABLES
let timerInterval = null;
let timerSecondsLeft = 0;
let timerInitialSeconds = 90; // Default 1:30
let isTimerRunning = false;

// 5. INICIALIZADOR DE ICONOS
function initIcons() {
    if (window.lucide) {
        window.lucide.createIcons();
    }
}

// 6. GESTIÓN DE NAVEGACIÓN PRINCIPAL
function switchTab(targetTabId) {
    if (state.currentTab === targetTabId) return;
    
    // Apagar la activa
    document.querySelectorAll('.screen').forEach(screen => {
        if (screen.id !== 'screen-general' && screen.id !== 'screen-foco') {
            screen.classList.remove('active');
        }
    });
    
    // Encender la seleccionada
    const targetScreen = document.getElementById(targetTabId);
    if (targetScreen) {
        targetScreen.classList.add('active');
    }
    
    // Actualizar nav items
    dom.navItems.forEach(item => {
        if (item.dataset.target === targetTabId) {
            item.classList.add('active');
        } else {
            item.classList.remove('active');
        }
    });
    
    state.currentTab = targetTabId;
    
    // Si volvemos al Home de entrenamientos, aseguramos cerrar sub-pantallas
    if (targetTabId === 'screen-entreno') {
        dom.screens.general.classList.remove('active');
        dom.screens.foco.classList.remove('active');
        dom.navBar.style.display = 'flex';
    } else {
        dom.screens.general.classList.remove('active');
        dom.screens.foco.classList.remove('active');
    }
}

// 7. FUNCIONES DE VISTA GENERAL (RUTINAS)
function openRoutineGeneral(routineKey) {
    const routine = ROUTINE_DATA[routineKey];
    if (!routine) return;
    
    state.currentRoutineKey = routineKey;
    dom.routineGeneralTitle.textContent = routine.title;
    
    // Determinar ID de sesión en formato DIA_X/RUTINA
    const todayStr = new Date().toISOString().split('T')[0];
    const sessionID = "DIA_" + todayStr.replace(/-/g, '_') + "/" + routineKey.toUpperCase().replace(/-/g, '_');
    
    const saved = localStorage.getItem(sessionID);
    if (saved) {
        try {
            state.focoData = JSON.parse(saved);
            console.log("Cargada persistencia atómica para:", sessionID, state.focoData);
        } catch (e) {
            console.error("Error al cargar persistencia:", e);
            state.focoData = {};
        }
    } else {
        state.focoData = {};
        console.log("No hay sesión activa para hoy en DB_WORKOUTS. Inicializado limpio.");
    }
    
    // Poblar la lista de ejercicios dinámicamente
    dom.exerciseListContainer.innerHTML = '';
    
    routine.exercises.forEach((ex, index) => {
        const card = document.createElement('div');
        card.className = 'card-exercise';
        card.innerHTML = \`
            <div class="exercise-title-row">
                <span class="exercise-name">\${ex.name}</span>
                <i data-lucide="chevron-right" class="arrow-right-icon"></i>
            </div>
            <div class="history-block">
                \${ex.history.map(row => {
                    const setsStr = row.split('|')[0].trim();
                    const setsArr = setsStr.split(/\s+/);
                    const setsCount = setsArr.length;
                    const sets = setsArr.map(set => \`<span class="history-set">\${set}</span>\`).join('');
                    return \`<div class="history-row" style="grid-template-columns: repeat(\${setsCount}, 1fr);">\${sets}</div>\`;
                }).join('')}
            </div>
        \`;
        
        // Al tocar un ejercicio abrir Vista Foco
        card.addEventListener('click', () => {
            openExerciseFoco(index);
        });
        
        dom.exerciseListContainer.appendChild(card);
    });
    
    // Sincronizar estado visual del botón Iniciar/Terminar Entreno
    if (state.isWorkoutActive) {
        dom.btnStartWorkout.classList.add('active-workout');
        dom.btnStartWorkout.innerHTML = '<i data-lucide="square"></i><span>Terminar Entreno</span>';
    } else {
        dom.btnStartWorkout.classList.remove('active-workout');
        dom.btnStartWorkout.innerHTML = '<i data-lucide="play"></i><span>Iniciar Entreno</span>';
    }

    // Mostrar pantalla general
    dom.screens.general.classList.add('active');
    // Ocultar barra inferior para dar foco
    dom.navBar.style.display = 'none';
    
    initIcons();
}

function closeRoutineGeneral() {
    dom.screens.general.classList.remove('active');
    dom.navBar.style.display = 'flex';
}

// 8. FUNCIONES DE VISTA FOCO (ZONA DE GUERRA)
function openExerciseFoco(index) {
    const routine = ROUTINE_DATA[state.currentRoutineKey];
    if (!routine || index < 0 || index >= routine.exercises.length) return;
    
    state.currentExerciseIndex = index;
    const exercise = routine.exercises[index];
    const focoKey = \`\${state.currentRoutineKey}-\${index}\`;
    
    // Inicializar focoData para este ejercicio si no existe con totalSets dinámicos (iniciar vacíos)
    if (!state.focoData[focoKey]) {
        const sets = {};
        for (let i = 1; i <= exercise.totalSets; i++) {
            sets[i] = { weight: "", reps: "", rir: "" };
        }
        state.focoData[focoKey] = {
            notes: '',
            setupTechnical: dbSetups[exercise.name] || exercise.setupTechnical || exercise.notes || "",
            sets: sets
        };
    }
    
    // Resetear a Serie 1
    state.currentSet = 1;
    
    // Cargar datos en pantalla
    dom.focoExerciseName.textContent = exercise.name;
    dom.focoExerciseIndex.textContent = \`Ejercicio \${index + 1} de \${routine.exercises.length}\`;
    
    // Cargar Notas Generales y Setup Técnico (Editable Textarea)
    dom.infoModalText.value = state.focoData[focoKey].setupTechnical;
    dom.inputDailyNotes.value = state.focoData[focoKey].notes;
    
    // Cargar Historial Reciente (los últimos 3 entrenamientos)
    const historyList = document.getElementById('foco-history-list');
    if (historyList) {
        historyList.innerHTML = '';
        const rawHistory = exercise.history || [];
        const last3 = rawHistory.slice(-3).reverse();
        
        // Generar etiquetas de fecha de forma representativa (Hoy/Previo, Hace 7 días, Hace 14 días...)
        const relativeDates = ["Hoy (Previo)", "Hace 7 días", "Hace 14 días"];
        
        if (last3.length === 0) {
            historyList.innerHTML = \`<div style="color: #666; font-size: 13px; font-style: italic; padding: 4px 0;">No hay historial registrado.</div>\`;
        } else {
            last3.forEach((sessionStr, idx) => {
                const parts = sessionStr.split('|');
                const setsStr = parts[0].trim();
                const noteText = parts[1] ? parts[1].trim() : '';
                
                const setsArr = setsStr.split(/\s+/);
                
                const itemDiv = document.createElement('div');
                itemDiv.className = 'history-item-foco';
                
                // Fila principal
                const mainRow = document.createElement('div');
                mainRow.className = 'history-row-main';
                
                // Fecha y campanita
                const dateWrapper = document.createElement('div');
                dateWrapper.className = 'history-date-wrapper';
                
                const dateSpan = document.createElement('span');
                dateSpan.className = 'history-date';
                dateSpan.textContent = relativeDates[idx] || "Sesión Pasada";
                dateWrapper.appendChild(dateSpan);
                
                if (noteText) {
                    const bellBtn = document.createElement('button');
                    bellBtn.className = 'history-bell-btn';
                    bellBtn.innerHTML = \`<i data-lucide="bell"></i>\`;
                    bellBtn.addEventListener('click', (e) => {
                        e.stopPropagation();
                        const noteDiv = itemDiv.querySelector('.history-note-expanded');
                        noteDiv.classList.toggle('show');
                    });
                    dateWrapper.appendChild(bellBtn);
                }
                mainRow.appendChild(dateWrapper);
                
                // Resumen de series
                const setsSummary = document.createElement('div');
                setsSummary.className = 'history-sets-summary';
                
                setsArr.forEach(setVal => {
                    const pill = document.createElement('span');
                    pill.className = 'history-set-pill';
                    pill.textContent = setVal;
                    setsSummary.appendChild(pill);
                });
                mainRow.appendChild(setsSummary);
                itemDiv.appendChild(mainRow);
                
                // Nota desplegable
                if (noteText) {
                    const noteDiv = document.createElement('div');
                    noteDiv.className = 'history-note-expanded';
                    noteDiv.textContent = noteText;
                    itemDiv.appendChild(noteDiv);
                }
                
                historyList.appendChild(itemDiv);
            });
        }
    }
    
    // Renderizado dinámico de selector de series (Set 1, Set 2...)
    const container = document.querySelector('.set-selector-container');
    container.innerHTML = '';
    for (let i = 1; i <= exercise.totalSets; i++) {
        const btn = document.createElement('button');
        btn.className = \`btn-set \${i === 1 ? 'active' : ''}\`;
        btn.dataset.set = i;
        btn.textContent = \`Set \${i}\`;
        btn.addEventListener('click', () => {
            // Guardar datos actuales de la serie antes de cambiar
            updateStateData();
            
            // Cambiar serie activa
            state.currentSet = i;
            
            // Actualizar UI de botones
            container.querySelectorAll('.btn-set').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            
            // Cargar datos de la nueva serie
            const exerciseData = state.focoData[focoKey];
            const currentSetData = exerciseData.sets[i];
            dom.inputs.weight.value = currentSetData.weight;
            dom.inputs.reps.value = currentSetData.reps;
            dom.inputs.rir.value = currentSetData.rir;
        });
        container.appendChild(btn);
    }
    
    // Asignar inputs desde la serie 1
    const currentSetData = state.focoData[focoKey].sets[1];
    dom.inputs.weight.value = currentSetData.weight;
    dom.inputs.reps.value = currentSetData.reps;
    dom.inputs.rir.value = currentSetData.rir;
    
    // Resetear/detener cronómetro si cambia el ejercicio
    resetTimer();
    
    // Mostrar pantalla foco
    dom.screens.foco.className = 'screen active screen-foco'; // Limpiar clases de animación previas
    
    initIcons();
}

function closeExerciseFoco() {
    dom.screens.foco.classList.remove('active');
    resetTimer();
}

// Cambiar de ejercicio (Navegación vertical dentro de Foco)
function navigateExercise(direction) {
    const routine = ROUTINE_DATA[state.currentRoutineKey];
    if (!routine) return;
    
    let newIndex = state.currentExerciseIndex + direction;
    
    // Validar límites
    if (newIndex >= 0 && newIndex < routine.exercises.length) {
        // Animaciones de transición
        const focoScreen = dom.screens.foco;
        
        // Agregar clase para animación visual
        if (direction > 0) {
            focoScreen.classList.add('swipe-up-anim'); // Siguiente (deslizar arriba)
        } else {
            focoScreen.classList.add('swipe-down-anim'); // Anterior (deslizar abajo)
        }
        
        // Cargar datos tras delay corto de animación
        setTimeout(() => {
            openExerciseFoco(newIndex);
            focoScreen.classList.remove('swipe-up-anim', 'swipe-down-anim');
        }, 150);
    } else {
        // Alerta de feedback táctil suave si llega al final
        const borderGlow = direction > 0 ? 'top' : 'bottom';
        const indicator = document.querySelector(\`.swipe-indicator.\${borderGlow}\`);
        if (indicator) {
            indicator.style.backgroundColor = 'var(--accent-purple-bright)';
            indicator.style.boxShadow = '0 0 10px var(--accent-purple-bright)';
            setTimeout(() => {
                indicator.style.backgroundColor = 'var(--border-subtle)';
                indicator.style.boxShadow = 'none';
            }, 300);
        }
    }
}

// 9. LÓGICA DE LOS INPUTS HÍBRIDOS (STEPPERS)
function setupSteppers() {
    // PESO (Step: 2.5 kg)
    dom.buttons.weightMinus.addEventListener('click', () => {
        let val = parseFloat(dom.inputs.weight.value) || 0;
        val = Math.max(0, val - 2.5);
        dom.inputs.weight.value = val % 1 === 0 ? val.toFixed(0) : val.toFixed(1);
        updateStateData();
    });
    dom.buttons.weightPlus.addEventListener('click', () => {
        let val = parseFloat(dom.inputs.weight.value) || 0;
        val += 2.5;
        dom.inputs.weight.value = val % 1 === 0 ? val.toFixed(0) : val.toFixed(1);
        updateStateData();
    });
    
    // REPETICIONES (Step: 1)
    dom.buttons.repsMinus.addEventListener('click', () => {
        let val = parseInt(dom.inputs.reps.value) || 0;
        val = Math.max(0, val - 1);
        dom.inputs.reps.value = val;
        updateStateData();
    });
    dom.buttons.repsPlus.addEventListener('click', () => {
        let val = parseInt(dom.inputs.reps.value) || 0;
        val += 1;
        dom.inputs.reps.value = val;
        updateStateData();
    });
    
    // RIR (Reps in Reserva, Límite mínimo: 0)
    dom.buttons.rirMinus.addEventListener('click', () => {
        let val = dom.inputs.rir.value.trim().toUpperCase();
        if (val === 'F') {
            // Ya está en Fallo
        } else if (val === '0' || val === '' || parseInt(val) === 0) {
            dom.inputs.rir.value = 'F';
        } else {
            let num = parseInt(val) || 0;
            dom.inputs.rir.value = Math.max(0, num - 1);
        }
        updateStateData();
    });
    dom.buttons.rirPlus.addEventListener('click', () => {
        let val = dom.inputs.rir.value.trim().toUpperCase();
        if (val === 'F') {
            dom.inputs.rir.value = '0';
        } else {
            let num = parseInt(val) || 0;
            dom.inputs.rir.value = num + 1;
        }
        updateStateData();
    });
    
    // Escuchar cambios directos en los inputs
    Object.values(dom.inputs).forEach(input => {
        input.addEventListener('change', () => {
            if (input.id === 'input-rir') {
                let val = input.value.trim().toUpperCase();
                if (val === 'F') {
                    input.value = 'F';
                } else {
                    let num = parseInt(val) || 0;
                    input.value = Math.max(0, Math.min(5, num));
                }
            } else {
                let val = parseFloat(input.value) || 0;
                if (val < 0) input.value = 0;
            }
            updateStateData();
        });
        
        input.addEventListener('focus', () => {
            if (input.value === "0" || parseFloat(input.value) === 0) {
                input.value = '';
            } else {
                input.select();
            }
        });
        
        input.addEventListener('blur', () => {
            if (input.value.trim() === '') {
                input.value = "0";
            }
            updateStateData();
        });
    });
}

// Sincronizar inputs manuales con el estado mock y persistir localmente
function updateStateData() {
    const focoKey = \`\${state.currentRoutineKey}-\${state.currentExerciseIndex}\`;
    const exerciseData = state.focoData[focoKey];
    if (!exerciseData) return;
    
    const set = state.currentSet;
    const wVal = dom.inputs.weight.value.trim();
    const rVal = dom.inputs.reps.value.trim();
    const rirVal = dom.inputs.rir.value.trim().toUpperCase();
    
    exerciseData.sets[set].weight = wVal === "" ? "" : (parseFloat(wVal) || 0);
    exerciseData.sets[set].reps = rVal === "" ? "" : (parseInt(rVal) || 0);
    
    if (rirVal === 'F') {
        exerciseData.sets[set].rir = 'F';
    } else {
        exerciseData.sets[set].rir = rirVal === "" ? "" : (parseInt(rirVal) || 0);
    }
    saveWorkout();
}

// 10. LÓGICA DEL CRONÓMETRO
function formatTime(totalSeconds) {
    const mins = Math.floor(totalSeconds / 60);
    const secs = totalSeconds % 60;
    return \`\${mins.toString().padStart(2, '0')}:\${secs.toString().padStart(2, '0')}\`;
}

function updateTimerDisplay() {
    dom.timerDisplay.textContent = formatTime(timerSecondsLeft);
}

function startTimer(seconds) {
    clearInterval(timerInterval);
    timerSecondsLeft = seconds;
    updateTimerDisplay();
    
    dom.timerStatus.textContent = "Descansando...";
    dom.timerStatus.style.color = "var(--accent-purple-bright)";
    isTimerRunning = true;
    
    dom.btnTimerPlay.innerHTML = '<i data-lucide="pause"></i>';
    initIcons();
    
    timerInterval = setInterval(() => {
        if (timerSecondsLeft > 0) {
            timerSecondsLeft--;
            updateTimerDisplay();
        } else {
            // Completado
            clearInterval(timerInterval);
            isTimerRunning = false;
            dom.timerStatus.textContent = "¡Tiempo completado!";
            dom.timerStatus.style.color = "var(--accent-red)";
            dom.btnTimerPlay.innerHTML = '<i data-lucide="play"></i>';
            initIcons();
            
            // Haptic feedback (Vibración fuerte en dispositivo)
            if (navigator.vibrate) {
                navigator.vibrate([200, 100, 200, 100, 300]);
            }
            
            // Animación de flash rojo
            dom.timerDisplay.style.color = "var(--accent-red)";
            setTimeout(() => {
                dom.timerDisplay.style.color = "var(--text-primary)";
            }, 1000);
        }
    }, 1000);
}

function pauseTimer() {
    clearInterval(timerInterval);
    isTimerRunning = false;
    dom.timerStatus.textContent = "Descanso pausado";
    dom.timerStatus.style.color = "var(--text-secondary)";
    dom.btnTimerPlay.innerHTML = '<i data-lucide="play"></i>';
    initIcons();
}

function resetTimer() {
    clearInterval(timerInterval);
    isTimerRunning = false;
    timerSecondsLeft = timerInitialSeconds;
    updateTimerDisplay();
    dom.timerStatus.textContent = "Descanso listo";
    dom.timerStatus.style.color = "var(--text-muted)";
    dom.btnTimerPlay.innerHTML = '<i data-lucide="play"></i>';
    
    // Limpiar presets activos
    dom.timerPresets.forEach(btn => btn.classList.remove('active'));
    
    initIcons();
}

function setupTimer() {
    // Cargar visual inicial
    timerSecondsLeft = timerInitialSeconds;
    updateTimerDisplay();
    
    // Play / Pause
    dom.btnTimerPlay.addEventListener('click', () => {
        if (isTimerRunning) {
            pauseTimer();
        } else {
            if (timerSecondsLeft <= 0) {
                timerSecondsLeft = timerInitialSeconds;
            }
            startTimer(timerSecondsLeft);
        }
    });
    
    // Reset
    dom.btnTimerReset.addEventListener('click', () => {
        resetTimer();
    });
    
    // Botones rápidos (Presets)
    dom.timerPresets.forEach(btn => {
        btn.addEventListener('click', () => {
            dom.timerPresets.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            
            const secs = parseInt(btn.dataset.seconds);
            timerInitialSeconds = secs;
            startTimer(secs);
        });
    });
    
    // Entrada Manual
    dom.timerManual.addEventListener('change', () => {
        const val = dom.timerManual.value.trim();
        // Acepta formato MM:SS o número de segundos
        if (val.includes(':')) {
            const parts = val.split(':');
            const mins = parseInt(parts[0]) || 0;
            const secs = parseInt(parts[1]) || 0;
            timerInitialSeconds = (mins * 60) + secs;
        } else {
            timerInitialSeconds = parseInt(val) || 90;
        }
        
        dom.timerManual.value = ''; // Limpiar input
        resetTimer();
        startTimer(timerInitialSeconds);
    });
}

// 11. SISTEMA DE GESTOS (SWIPES) EN PANTALLA FOCO
let touchStartX = 0;
let touchStartY = 0;
let touchEndX = 0;
let touchEndY = 0;

function setupGestures() {
    const target = dom.screens.foco;
    
    // Soporte táctil
    target.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
        touchStartY = e.changedTouches[0].screenY;
    }, { passive: true });
    
    target.addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].screenX;
        touchEndY = e.changedTouches[0].screenY;
        handleSwipeGesture();
    }, { passive: true });
    
    // Soporte de ratón (para pruebas en escritorio)
    let isMouseDown = false;
    
    target.addEventListener('mousedown', (e) => {
        touchStartX = e.screenX;
        touchStartY = e.screenY;
        isMouseDown = true;
    });
    
    target.addEventListener('mouseup', (e) => {
        if (!isMouseDown) return;
        touchEndX = e.screenX;
        touchEndY = e.screenY;
        isMouseDown = false;
        handleSwipeGesture();
    });
}

function handleSwipeGesture() {
    const diffX = touchEndX - touchStartX;
    const diffY = touchEndY - touchStartY;
    
    const threshold = 70; // Umbral de swipe en pixeles
    
    if (Math.abs(diffX) > Math.abs(diffY)) {
        // Deslizamiento Horizontal
        if (diffX > threshold) {
            // Swipe Derecha (deslizar de izquierda a derecha -> Volver)
            closeExerciseFoco();
        }
    }
}

// Soporte de atajos de teclado para facilitar pruebas de desarrollo
function setupKeyboardShortcuts() {
    window.addEventListener('keydown', (e) => {
        // Solo actuar si la pantalla Foco está visible
        if (dom.screens.foco.classList.contains('active')) {
            if (e.key === 'Escape' || e.key === 'ArrowRight') {
                e.preventDefault();
                closeExerciseFoco(); // Volver
            }
        }
    });
}

// 12. EVENT BINDINGS GENERALES
function bindEvents() {
    // Toggles de pestañas principales (Navbar inferior)
    dom.navItems.forEach(item => {
        item.addEventListener('click', () => {
            const target = item.dataset.target;
            switchTab(target);
        });
    });
    
    // Rutinas en Home
    document.querySelectorAll('.btn-routine').forEach(btn => {
        btn.addEventListener('click', () => {
            const routineKey = btn.dataset.routine;
            openRoutineGeneral(routineKey);
        });
    });
    
    // Botones de vuelta atrás
    dom.btnBackToHome.addEventListener('click', closeRoutineGeneral);
    dom.btnBackToGeneral.addEventListener('click', closeExerciseFoco);
    
    // Nueva UX Vista Foco: Abrir/Cerrar Modal de Info
    dom.btnInfoModal.addEventListener('click', () => {
        dom.infoModal.classList.add('show');
    });
    
    dom.btnCloseInfoModal.addEventListener('click', () => {
        dom.infoModal.classList.remove('show');
    });
    
    // Nueva UX Vista Foco: Guardar Notas Diarias (Notas Generales)
    dom.inputDailyNotes.addEventListener('input', (e) => {
        const focoKey = \`\${state.currentRoutineKey}-\${state.currentExerciseIndex}\`;
        const exerciseData = state.focoData[focoKey];
        if (exerciseData) {
            exerciseData.notes = e.target.value;
            saveWorkout();
        }
    });

    // Nueva UX Vista Foco: Guardar Setup Técnico Editable
    dom.infoModalText.addEventListener('input', (e) => {
        const focoKey = \`\${state.currentRoutineKey}-\${state.currentExerciseIndex}\`;
        const exerciseData = state.focoData[focoKey];
        if (exerciseData) {
            exerciseData.setupTechnical = e.target.value;
            
            // Guardar en DB_SETUPS diccionario global
            const routine = ROUTINE_DATA[state.currentRoutineKey];
            if (routine && routine.exercises[state.currentExerciseIndex]) {
                const exName = routine.exercises[state.currentExerciseIndex].name;
                dbSetups[exName] = e.target.value;
                localStorage.setItem('DB_SETUPS', JSON.stringify(dbSetups));
                
                // Notificar al puente AsyncStorage nativo
                if (window.ReactNativeWebView) {
                    window.ReactNativeWebView.postMessage(JSON.stringify({
                        action: 'save',
                        key: 'DB_SETUPS',
                        value: JSON.stringify(dbSetups)
                    }));
                }
            }
            saveWorkout();
        }
    });

    // Botón Sincronizar Google Sheets Manual Premium
    const btnSyncSheets = document.getElementById('btn-sync-sheets-manual');
    if (btnSyncSheets) {
        btnSyncSheets.addEventListener('click', () => {
            syncToGoogleSheets();
        });
    }
    


    // Botón decorativo de tema
    document.getElementById('btn-theme-info').addEventListener('click', () => {
        alert("WARZONE LOG: Estricto Dark Mode activo. Acentos en Morado Eléctrico.");
    });
    
    // Botón Iniciar/Terminar Entreno en Vista General
    dom.btnStartWorkout.addEventListener('click', () => {
        if (!state.isWorkoutActive) {
            state.isWorkoutActive = true;
            dom.btnStartWorkout.classList.add('active-workout');
            dom.btnStartWorkout.innerHTML = '<i data-lucide="square"></i><span>Terminar Entreno</span>';
            alert("¡Entrenamiento iniciado! Toca cualquier ejercicio para ingresar a la Zona de Guerra.");
        } else {
            state.isWorkoutActive = false;
            dom.btnStartWorkout.classList.remove('active-workout');
            dom.btnStartWorkout.innerHTML = '<i data-lucide="play"></i><span>Iniciar Entreno</span>';
            alert("¡Entrenamiento terminado y guardado en la memoria!");
        }
        initIcons();
    });
}

// 13. BOOTSTRAP DE LA APLICACIÓN
function init() {
    bindEvents();
    setupSteppers();
    setupTimer();
    setupGestures();
    setupKeyboardShortcuts();
    loadSetups();
    initIcons();
    console.log("WARZONE STRENGTH LOG - Frontend cargado con éxito.");
}

// 14. SISTEMA DE PERSISTENCIA LOCAL Y SINCRONIZACIÓN DE GOOGLE SHEETS
let dbSetups = {};

function loadSetups() {
    const saved = localStorage.getItem('DB_SETUPS');
    if (saved) {
        try {
            dbSetups = JSON.parse(saved);
            console.log("WARZONE: Cargados setups técnicos:", dbSetups);
        } catch (e) {
            console.error("WARZONE: Error al cargar setups:", e);
            dbSetups = {};
        }
    }
}

function saveWorkout() {
    if (!state.currentRoutineKey) return;
    const todayStr = new Date().toISOString().split('T')[0];
    const sessionID = "DIA_" + todayStr.replace(/-/g, '_') + "/" + state.currentRoutineKey.toUpperCase().replace(/-/g, '_');
    
    // Marcar que esta sesión tiene cambios pendientes de sincronizar
    state.focoData.syncPending = true;
    
    const dataStr = JSON.stringify(state.focoData);
    localStorage.setItem(sessionID, dataStr);
    console.log("WARZONE: Guardada persistencia en DB_WORKOUTS con syncPending:true:", sessionID);
    
    // Si corre en React Native WebView, notificar al contenedor nativo para guardado atómico AsyncStorage
    if (window.ReactNativeWebView) {
        window.ReactNativeWebView.postMessage(JSON.stringify({
            action: 'save',
            key: sessionID,
            value: dataStr
        }));
    }
}

function getAllSessionKeys() {
    const keys = [];
    for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key && key.startsWith("DIA_")) {
            keys.push(key);
        }
    }
    return keys;
}

function getHorizontalRowForSession(dateStr, routineKey, workoutData) {
    const routine = ROUTINE_DATA[routineKey];
    if (!routine) return [dateStr, routineKey];
    
    const row = [dateStr, routine.title];
    routine.exercises.forEach((exercise, idx) => {
        const focoKey = \`\${routineKey}-\${idx}\`;
        const exerciseData = workoutData[focoKey];
        
        for (let s = 1; s <= exercise.totalSets; s++) {
            if (exerciseData && exerciseData.sets[s]) {
                const setData = exerciseData.sets[s];
                row.push(setData.weight !== undefined ? setData.weight : "");
                row.push(setData.reps !== undefined ? setData.reps : "");
                row.push(setData.rir !== undefined ? setData.rir : "");
            } else {
                row.push("", "", "");
            }
        }
        row.push(exerciseData ? (exerciseData.notes || "") : "");
    });
    return row;
}

async function syncToGoogleSheets() {
    const btnSync = document.getElementById('btn-sync-sheets-manual');
    if (btnSync) {
        btnSync.classList.add('loading');
        btnSync.innerHTML = '<div class="spinner"></div><span>Sincronizando...</span>';
    }
    
    const sessionKeys = getAllSessionKeys();
    const dataToSync = [];
    const keysToUpdate = [];
    
    sessionKeys.forEach(key => {
        const saved = localStorage.getItem(key);
        if (saved) {
            try {
                const sessionData = JSON.parse(saved);
                if (sessionData.syncPending) {
                    const parts = key.split('/');
                    const dateStr = parts[0].replace("DIA_", "").replace(/_/g, "-");
                    const routineKey = parts[1].toLowerCase().replace(/_/g, "-");
                    
                    const row = getHorizontalRowForSession(dateStr, routineKey, sessionData);
                    dataToSync.push(row);
                    keysToUpdate.push({ key, data: sessionData });
                }
            } catch (e) {
                console.error("Error parsing key during sync:", key, e);
            }
        }
    });
    
    if (dataToSync.length === 0) {
        alert("Todo está al día.");
        restoreSyncButton();
        return;
    }
    
    console.log("WARZONE: Sincronizando entrenamientos con Google Sheets:", dataToSync);
    
    try {
        const response = await fetch('https://script.google.com/macros/s/AKfycbxoKN58eAj0bFaBJ_jZaqsjFdH5GZbR5aMNf4r8mAghHiwWvSlFl097MCGbVJVrwydp/exec', {
            method: 'POST',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(dataToSync)
        });
        
        // Google Apps Script a veces devuelve CORS redirects, pero con no-cors o si se completa,
        // cambiamos el estado de syncPending. Asumimos éxito si la petición POST finaliza.
        keysToUpdate.forEach(item => {
            item.data.syncPending = false;
            const updatedStr = JSON.stringify(item.data);
            localStorage.setItem(item.key, updatedStr);
            if (window.ReactNativeWebView) {
                window.ReactNativeWebView.postMessage(JSON.stringify({
                    action: 'save',
                    key: item.key,
                    value: updatedStr
                }));
            }
        });
        
        alert("Entrenamientos sincronizados correctamente.");
    } catch (e) {
        console.error("Sync fetch error:", e);
        alert("Error al sincronizar con Google Sheets. Verifica tu conexión.");
    } finally {
        restoreSyncButton();
    }
}

function restoreSyncButton() {
    const btnSync = document.getElementById('btn-sync-sheets-manual');
    if (btnSync) {
        btnSync.classList.remove('loading');
        btnSync.innerHTML = '<i data-lucide="cloud-lightning"></i><span>Sincronizar Datos</span>';
        initIcons();
    }
}

// Arrancar cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', init);
</script>
</body>
</html>
`;

export default function App() {
  const webViewRef = useRef(null);

  const onMessage = async (event) => {
    try {
      const msg = JSON.parse(event.nativeEvent.data);
      if (msg.action === 'save') {
        await AsyncStorage.setItem(msg.key, msg.value);
        console.log('AsyncStorage Bridge saved:', msg.key);
      }
    } catch (e) {
      console.error('AsyncStorage Bridge Error:', e);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#000000" />
      <WebView 
        ref={webViewRef}
        source={{ html: htmlContent }} 
        style={{ flex: 1, backgroundColor: '#000000' }} 
        originWhitelist={['*']}
        javaScriptEnabled={true}
        domStorageEnabled={true}
        bounces={false}
        onMessage={onMessage}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: '#000000',
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0
  }
});
