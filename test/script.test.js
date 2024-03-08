// script.test.js

import { calcularArea, modalOption, closeModal } from '../js/script1.js';
  
  // para el documento y los elementos HTML
  document.body.innerHTML = `
    <div id="figuras"></div>
    <div id="modal">
      <div id="modal-content"></div>
    </div>
    <div id="resultado"></div>
  `;
  
  // Pruebas para la función calcularArea
  test('calcularArea - Cuadrado', () => {
    document.body.innerHTML += `
      <input type="number" id="lado" value="3">
    `;
  
    const event = { target: document.getElementById("lado") };
    const result = calcularArea('cuadrado', event, 8);
  
    expect(result).toBe('9');
  });
  
  // Pruebas para la función modalOption
  test('modalOption - Creación de Figuras HTML', () => {
    modalOption();
  
    const figurasHTML = document.querySelectorAll(".figura");
    expect(figurasHTML.length).toBeGreaterThan(0);
  });
  
  // Pruebas para la función closeModal
  test('closeModal - Cierre con evento', () => {
    const modal = document.getElementById("modal");
    modal.style.display = "block";
  
    const event = new KeyboardEvent('keydown', { key: 'Escape' });
    closeModal(event);
  
    expect(modal.style.display).toBe("none");
  });
  

  