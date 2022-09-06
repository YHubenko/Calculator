let buttons = ['C', '/', '*', 'CE', 7, 8, 9, '-', 4, 5, 6, '+', 1, 2, 3, '%', 0, '00', '.', '='];


let i = 0;
for (const button of buttons) {
    i++;
    let btnContainer = document.createElement('div');
    let btn = document.createElement('button');
    btn.textContent = button;
    btnContainer.append(btn);
    btnContainer.classList.add('btn-container');
    document.querySelector('#keyboard').append(btnContainer);
    if (i < 4 || i % 4 === 0) {
        btn.classList.add('btn-border');
    }
}