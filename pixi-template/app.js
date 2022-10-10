const Application = PIXI.Application ;

const app = new PIXI.Application({ transparent: false });
document.body.appendChild(app.view);
app.renderer.resize(window.innerWidth, window.innerHeight)
app.renderer.view.style.position = 'absolute' ;