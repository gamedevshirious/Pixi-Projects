import { helper } from "./helper.js";
import { changingValues, controllingValues,GameTimers,MAXVALUES, screenPos, STATEMACHINE, States } from "./resource.js";
import { GameObjects } from "./scene.js";
var helperclass = new helper();

var bulletsSize = 20;
var normalSpaceObjectSize = 10;
var bossSpaceObjectsSize = 1;
var wallerSpaceObjectSize = 4;

var normalSpaceObject = [];
var bossSpaceObjects = [];
var wallerSpaceObjects = [];
var bulletsObject = [];
var bossbullets = [];

export var ObjectArray = {
  normalSpaceObject,
  bossSpaceObjects,
  wallerSpaceObjects,
  bulletsObject,
  bossbullets,
};
export var ObjectSizes = {
  bulletsSize,
  normalSpaceObjectSize,
  bossSpaceObjectsSize,
  wallerSpaceObjectSize,
};
export const SpaceObjectsTypes = {
    Normal: 1,
    Boss: 2,
    Waller: 3,
    Rotator: 4
};
export class bullets{
    
    constructor(){
    }

    InstantiateBullets(textureloc, texturewidth, textureheight, texturescale, textureanchor) {

        var bulletObj = helperclass.DisplayTexture(textureloc, texturewidth, textureheight, texturescale, textureanchor);
        bulletObj.rotation = 80;
        bulletObj.visible = false;

        return bulletObj;
    }

    moveBullets(speed) {
        for (let i = 0; i < ObjectSizes.bulletsSize; i++) {
            if (ObjectArray.bulletsObject[i].y < 0) {
                ObjectArray.bulletsObject[i].visible = false;
            }
            if (ObjectArray.bulletsObject[i].visible == false) {
                ObjectArray.bulletsObject[i].x = GameObjects.rocket.x;
                ObjectArray.bulletsObject[i].y = GameObjects.rocket.y;
                ObjectArray.bulletsObject[i].visible = true;
            }
            if (ObjectArray.bulletsObject[i].visible == true) {
                ObjectArray.bulletsObject[i].y -= (i + 1) * speed;
            }
        }
    }

    moveMultiBullets(rocketX1, rocketX2,speed) {
        for (let i = 0; i < ObjectSizes.bulletsSize; i++) {
            if (ObjectArray.bulletsObject[i].y < 0) {
                ObjectArray.bulletsObject[i].visible = false;
            }
            if (ObjectArray.bulletsObject[i].visible == false) {
                if (i == 0) {
                    ObjectArray.bulletsObject[i].x = rocketX2;
                }
                else if ((i % 2) == 0) {
                    ObjectArray.bulletsObject[i].x = rocketX1;
                }
                else {
                    ObjectArray.bulletsObject[i].x = rocketX2;
                }

                ObjectArray.bulletsObject[i].y = GameObjects.rocket.y;
                ObjectArray.bulletsObject[i].visible = true;
            }
            if (ObjectArray.bulletsObject[i].visible == true) {
                ObjectArray.bulletsObject[i].y -= (i + 1) * speed;
            }
        }

    }

}

export class enemies{
    constructor() {}
    InstantiateSpaceObjects(textureloc, texturewidth, textureheight, texturescale, textureanchor,spaceobjtype) {


        var spaceObj = helperclass.DisplayTexture(textureloc, texturewidth, textureheight, texturescale, textureanchor);
        spaceObj.attack = true;
        spaceObj.health = 100;
        spaceObj.visible = false;
        spaceObj.type = spaceobjtype;
        spaceObj.movable = true;
        spaceObj.y = this.screenY + 100;
        return spaceObj;
    }
    moveSpaceObj(speed) {
        for (let i = 0; i < ObjectSizes.normalSpaceObjectSize; i++) {
            if (ObjectArray.normalSpaceObject[i].y > screenPos.screenY) {
                ObjectArray.normalSpaceObject[i].visible = false;
                ObjectArray.normalSpaceObject[i].health = 0;
                ObjectArray.normalSpaceObject[i].attack = false;
            }
            if (ObjectArray.normalSpaceObject[i].visible == true) {
                ObjectArray.normalSpaceObject[i].y += speed;
            }
           
        }
    }
    SpawnNormalSpaceObj()
    {
        var counter = 0;
        var isready = false;
        var iArray = [];
        var normalCounter = 0;
       
        for (let i = 0; i < ObjectSizes.normalSpaceObjectSize; i++) 
        {
            // console.log(ObjectArray.normalSpaceObject[i]);
            if (ObjectArray.normalSpaceObject[i].visible == false && States.currentState == STATEMACHINE.GAMESTATEMACHINE.GamePlay)
            {
                

                    iArray[counter] = i;
                    counter = counter + 1;
                    if (counter == 5) {
                        var randomX = Math.floor((Math.random() * 50) + (-50));
                        // var randomY = Math.floor((Math.random() * (3)) + (0));
                        var posy = [0,-150];
                        var posx = 0;
                        
                        var rocketx = GameObjects.rocket.x;
                        if(rocketx < 15)
                        {
                            posx = rocketx + 12;
                        }
                        else if(rocketx > screenX - 15)
                        {
                            posx = rocketx - 12;
                        }
                        else
                        {
                            posx = rocketx + randomX;
                        }
                        // if(posx < 100)
                        // {
                        //     posx = 100;
                        // }
                        // if(posx > screenX - 100)
                        // {
                        //     posx = screenX - 100;
                        // }

                        
                        ObjectArray.normalSpaceObject[iArray[0]].x = posx;
                        ObjectArray.normalSpaceObject[iArray[0]].y = posy[normalCounter];
                      
                        ObjectArray.normalSpaceObject[iArray[0 + 1]].x = ObjectArray.normalSpaceObject[iArray[0]].x + 80 * changingValues.customiser;
                        ObjectArray.normalSpaceObject[iArray[0 + 1]].y = ObjectArray.normalSpaceObject[iArray[0]].y - 80 * changingValues.customiser;
                        ObjectArray.normalSpaceObject[iArray[0 + 2]].x = ObjectArray.normalSpaceObject[iArray[0]].x - 80 * changingValues.customiser;
                        ObjectArray.normalSpaceObject[iArray[0 + 2]].y = ObjectArray.normalSpaceObject[iArray[0]].y - 80 * changingValues.customiser;
                        ObjectArray.normalSpaceObject[iArray[0 + 3]].x = ObjectArray.normalSpaceObject[iArray[0]].x + 150 * changingValues.customiser;
                        ObjectArray.normalSpaceObject[iArray[0 + 3]].y = ObjectArray.normalSpaceObject[iArray[0]].y - 150 * changingValues.customiser;
                        ObjectArray.normalSpaceObject[iArray[0 + 4]].x = ObjectArray.normalSpaceObject[iArray[0]].x - 150 * changingValues.customiser;
                        ObjectArray.normalSpaceObject[iArray[0 + 4]].y = ObjectArray.normalSpaceObject[iArray[0]].y - 150 * changingValues.customiser;

                        counter = 0;
                        isready = true;
                        normalCounter = normalCounter + 1;
                        if(normalCounter < 1)
                        {
                            normalCounter = 0;
                        }

                    }
                    if (isready == true) 
                    {
                        for (let i = 0; i < 5; i++) {
                            ObjectArray.normalSpaceObject[iArray[i]].visible = true;
                            ObjectArray.normalSpaceObject[iArray[i]].health = 100;
                            ObjectArray.normalSpaceObject[iArray[i]].attack = true;

                        }

                        while (iArray.length <= 0) {
                            iArray.pop();
                        }

                        isready = false;
                    }

                
              
            }
    }
    }
    WallerObjMotion(speed) {
        var counter = 0;
        var iArray = [];
        var arrayCounter = 0;
        var wallerObjCounter = 0;

        for (let i = 0; i < ObjectSizes.wallerSpaceObjectSize; i++) {

            if (ObjectArray.wallerSpaceObjects[i].visible == true ) {
                if (ObjectArray.wallerSpaceObjects[i].y >= GameObjects.rocket.y - 70) {
                    ObjectArray.wallerSpaceObjects[i].movable = false;
                }
                else if (ObjectArray.wallerSpaceObjects[i].movable == true) {
                    // console.log(ObjectArray.wallerSpaceObjects[i].visible,ObjectArray.wallerSpaceObjects[i].x,ObjectArray.wallerSpaceObjects[i].y);
                    ObjectArray.wallerSpaceObjects[i].y += speed;
                }
            }
            else {
                
                iArray[counter] = i;
                counter = counter + 1;
                if (counter == 4) {
                    for (arrayCounter = 0; arrayCounter < counter; arrayCounter++) {
                        if (arrayCounter == 0) {
                            var randomX = Math.floor((Math.random() * (70)) + (-30));
                            var posx = 0;
                            var posy = [0,-200];
                        
                        var rocketx = GameObjects.rocket.x;
                        if(rocketx < 15)
                        {
                            posx = rocketx + 15;
                        }
                        else if(rocketx > screenX - 20)
                        {
                            posx = rocketx - 70;
                        }
                        else
                        {
                            posx = rocketx + randomX;
                        }
                        // if(posx < 10)
                        // {
                        //     posx = 10
                        // }
                        // else if(posx > screenX - 200)
                        // {
                        //     posx = screenX - 200;
                        // }
                            ObjectArray.wallerSpaceObjects[iArray[arrayCounter]].x = posx;
                            ObjectArray.wallerSpaceObjects[iArray[arrayCounter]].y = posy[wallerObjCounter];
                            ObjectArray.wallerSpaceObjects[iArray[arrayCounter]].visible = true;
                            ObjectArray.wallerSpaceObjects[iArray[arrayCounter]].attack = true;
                            ObjectArray.wallerSpaceObjects[iArray[arrayCounter]].movable = true;
                            wallerObjCounter = wallerObjCounter + 1;
                            if(wallerObjCounter < 1)
                            {
                                wallerObjCounter = 0;
                            }
                        }
                        else {
                            ObjectArray.wallerSpaceObjects[iArray[arrayCounter]].x = ObjectArray.wallerSpaceObjects[iArray[arrayCounter - 1]].x + 80 * changingValues.customiser;
                            ObjectArray.wallerSpaceObjects[iArray[arrayCounter]].y = ObjectArray.wallerSpaceObjects[iArray[arrayCounter - 1]].y;
                            ObjectArray.wallerSpaceObjects[iArray[arrayCounter]].visible = true;
                            ObjectArray.wallerSpaceObjects[iArray[arrayCounter]].attack = true;
                            ObjectArray.wallerSpaceObjects[iArray[arrayCounter]].movable = true;
                        }

                    }
                    while (iArray.length <= 0) {
                        iArray.pop();
                    }
                    counter = 0;
                }
            }
        }
    }
    moveBoss(speed,bulletSpeed,xSpeed) {
        for (let i = 0; i < ObjectSizes.bossSpaceObjectsSize; i++) {
            if (ObjectArray.bossSpaceObjects[i].y > screenPos.screenY) {
                controllingValues.isShooting = false;
                ObjectArray.bossSpaceObjects[i].movable = false;
                ObjectArray.bossSpaceObjects[i].visible = false;
                ObjectArray.bossSpaceObjects[i].attack = false;
            }
            if (ObjectArray.bossSpaceObjects[i].visible == false ) {
                // console.log("boss");
                ObjectArray.bossSpaceObjects[i].x = Math.floor((Math.random() * (screenPos.screenX - screenPos.screenX/4)) + (screenPos.screenX / 4));
                ObjectArray.bossSpaceObjects[i].y = Math.floor((Math.random() * (-1)) + (-10));
                ObjectArray.bossSpaceObjects[i].movable = true;
                ObjectArray.bossSpaceObjects[i].visible = true;
                ObjectArray.bossSpaceObjects[i].attack = true;
                ObjectArray.bossSpaceObjects[i].health = 100;
                controllingValues.isShooting = false;
            }
            if (ObjectArray.bossSpaceObjects[i].visible == true) {
                // console.log("boss visible");
                ObjectArray.bossSpaceObjects[i].movable = true;
                // ObjectArray.bossSpaceObjects[i].attack = true;
                ObjectArray.bossCurrentState = STATEMACHINE.BOSSSTATEMACHINE.Move;
                ObjectArray.bossSpaceObjects[i].y += speed;

                var distance = GameObjects.rocket.x - ObjectArray.bossSpaceObjects[i].x;

                if (distance >= 0) {
                    ObjectArray.bossSpaceObjects[i].x += speed;
                }
                else {
                    ObjectArray.bossSpaceObjects[i].x -= speed;
                }
                if(ObjectArray.bossSpaceObjects[i].x > 0 && ObjectArray.bossSpaceObjects[i].x < screenPos.screenX)
                {
                    GameTimers.BossShootTimer =  setInterval(this.setShooting, 4 * MAXVALUES.ONESECOND);

                    if(States.bossCurrentState == STATEMACHINE.BOSSSTATEMACHINE.Shoot)
                    {

                        this.BossBulletsShooting(ObjectArray.bossSpaceObjects[i]);
                    }
                    else
                    {
                        for(let j = 0; j < ObjectSizes.bulletsSize;j++)
                        {
                            ObjectArray.bossbullets[j].visible = false;
                        }
                    }
                   
                    GameTimers.BossResetShootTimer =  setInterval(this.stopShooting,5 * MAXVALUES.ONESECOND);
                    
                }
              
            }
        }
    }
    BossBulletsShooting(boss)
    {
        for(let j = 0; j < ObjectSizes.bulletsSize;j++)
                    {
                        if(ObjectArray.bossbullets[j].visible == false)
                        {
                            ObjectArray.bossbullets[j].x = boss.x;
                            ObjectArray.bossbullets[j].y = boss.y;
                            ObjectArray.bossbullets[j].visible = true;
                        }
                        else
                        {
                            var distance = GameObjects.rocket.x - boss.x;

                            var posx = GameObjects.rocket.x - boss.x;
                            var posy = GameObjects.rocket.y - boss.y;
                            // console.log(posx,posy);
                            var speedX = Math.atan2(posy,posx) * 180 / Math.PI;
            
                            if (distance >= 0) 
                            {
                            ObjectArray.bossbullets[j].x += speedX/5;
                            }
                            else {
                             ObjectArray.bossbullets[j].x -= speedX/5;
                            }
                            
                            ObjectArray.bossbullets[j].y += 40;
                        }   
                        if(ObjectArray.bossbullets[j].y > screenPos.screenY || ObjectArray.bossbullets[j].x > screenPos.screenX)
                        {
                            ObjectArray.bossbullets[j].visible = false;
                        }
                        
                    }
    }
    shootBullets(bulletSpeed, parent, xSpeed) {
        if (parent.visible == false) {
            return;
        }
        if(parent.visible == true)
        {
            for (let i = 0; i < ObjectSizes.bulletsSize; i++) 
            {
            if (ObjectArray.bossbullets[i].y > screenPos.screenY) {
                ObjectArray.bossbullets[i].visible = false;
            }
            if (States.bossCurrentState == STATEMACHINE.BOSSSTATEMACHINE.Shoot && parent.attack == true) {
                // console.log("fire");
                ObjectArray.bossbullets[i].x = parent.x;
                ObjectArray.bossbullets[i].y = parent.y;
                ObjectArray.bossbullets[i].visible = true;
                ObjectArray.bossbullets[i].alpha = 1;
                ObjectArray.bossbullets[i].zIndex = 5;
                ObjectArray.bossbullets[i].skew.x = 2;
                ObjectArray.bossbullets[i].skew.y = 2;
                
                // console.log("shoot",bossbullets[i].visible);
            }
            if (States.bossCurrentState != STATEMACHINE.BOSSSTATEMACHINE.Shoot) {
                ObjectArray.bossbullets[i].visible = false;
            }
            if (States.bossCurrentState == STATEMACHINE.BOSSSTATEMACHINE.Shoot && parent.attack == true && ObjectArray.bossbullets[i].visible == true) {
                var distance = GameObjects.rocket.x - ObjectArray.bossbullets[i].x;
            //    ObjectArray.bossbullets[i].visible = true;
                if (distance >= 0) {
                    ObjectArray.bossbullets[i].x += 5;
                }
                else {
                    ObjectArray.bossbullets[i].x -= 5;
                }

                ObjectArray.bossbullets[i].y += 5;

                console.log(ObjectArray.bossbullets[i].skew.x,ObjectArray.bossbullets[i].skew.y);
            }
        }

        }
        
    }
    setShooting()
    {
        States.bossCurrentState = STATEMACHINE.BOSSSTATEMACHINE.Shoot; 
    }
    stopShooting()
    {
        States.bossCurrentState = STATEMACHINE.BOSSSTATEMACHINE.ResetShooting;  
    }
}