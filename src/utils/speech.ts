export const speak = (text: string, rate: number = 0.85) => {
  if (typeof window === 'undefined' || !('speechSynthesis' in window)) return;

  window.speechSynthesis.cancel(); // Para qualquer áudio pendente
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = 'pt-BR'; // Configurado para Português
  utterance.rate = rate; // Velocidade suave e pausada
  utterance.pitch = 1.0;

  window.speechSynthesis.speak(utterance);
};