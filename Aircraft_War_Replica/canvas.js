// import { canvas} from "./resource.js";

export var canvas = document.getElementById("gamecanvas");
export var isResized = false;
let gameWSize = 1080;
let gameHSize = 1920;



export class CanvasSize{

     ScreenCanvas()
     {
          isResized = true;

          let w = window.innerWidth;
          let h = window.innerHeight;

          if(w == gameWSize && h == gameHSize)
               {
                    canvas.width = w;
                    canvas.height = h;
               }
          else if(w < gameWSize && h < gameHSize)
               {
                    let w2 = w * gameWSize/gameHSize * window.devicePixelRatio;
                    let h2 = h * gameWSize/gameHSize * window.devicePixelRatio;
                    canvas.width = w - (w2 + w);
                    canvas.height = h2 - (h2 - h);

               }
          else
               {
                    let w2 = gameWSize * gameWSize/gameHSize * window.devicePixelRatio;
                    let h2 = gameHSize * gameWSize/gameHSize * window.devicePixelRatio;
                    canvas.width = gameWSize;
                    if(h < gameHSize)
                         {
                              canvas.height = h;
                         
                         }
                    else
                         {
                              canvas.height = gameHSize;
                         }
                    
               }

     }    

     changeTOStart()
     {
          isResized = false;
     }
}

