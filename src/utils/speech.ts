/**
 * Utilitário de Síntese de Voz (Web Speech API)
 * Com suporte a configurações globais (velocidade, voz e mudo)
 */

export interface SpeechSettings {
  voiceEnabled: boolean;
  rate: number; // 0.7 (lento/infantil) a 1.2
}

export const defaultSpeechSettings: SpeechSettings = {
  voiceEnabled: true,
  rate: 0.9
};

let currentSettings: SpeechSettings = { ...defaultSpeechSettings };

export function updateSpeechSettings(settings: Partial<SpeechSettings>) {
  currentSettings = { ...currentSettings, ...settings };
}

export function speak(text: string, customRate?: number) {
  if (typeof window === 'undefined') return;
  if (!currentSettings.voiceEnabled) return;
  if (!('speechSynthesis' in window)) return;

  window.speechSynthesis.cancel();

  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = 'pt-BR';
  utterance.rate = customRate || currentSettings.rate;
  utterance.pitch = 1.1; // Tom levemente mais agudo/amigável para crianças

  // Busca voz em português do Brasil
  const voices = window.speechSynthesis.getVoices();
  const ptVoice = voices.find(
    (v) => v.lang.includes('pt-BR') || v.lang.includes('pt_BR') || v.lang.toLowerCase().startsWith('pt')
  );
  if (ptVoice) {
    utterance.voice = ptVoice;
  }

  window.speechSynthesis.speak(utterance);
}
