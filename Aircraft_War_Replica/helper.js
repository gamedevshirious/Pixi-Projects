import * as PIXI from 'pixi.js'
import * as particles from 'pixi-particles'
import { Gametexture } from "./resource.js";
// Create a new emitter
// note: if importing library like "import * as particles from 'pixi-particles'"
// or "const particles = require('pixi-particles')", the PIXI namespace will
// not be modified, and may not exist - use "new particles.Emitter()", or whatever
// your imported namespace is
export class helper {
  constructor() { }

  DisplayTexture(textureLoc, textureX, textureY, textureScale, textureAnchor) {
    const displayImage = new PIXI.Sprite.from(textureLoc);
    displayImage.anchor.set(textureAnchor);
    displayImage.scale.set(textureScale);
    displayImage.x = textureX;
    displayImage.y = textureY;
    displayImage.interactive = true;
    return displayImage;
  }

  DisplayText(textInput, textX, textY, textAnchor, style) {
    const text = new PIXI.Text(textInput, style);
    text.anchor.set(textAnchor);
    text.x = textX;
    text.y = textY;
    return text;
  }

  collisiondetection(a, b) {
    let obj1 = a.getBounds();
    let obj2 = b.getBounds();

    return obj1.x + obj1.width > obj2.x && obj1.x < obj2.x + obj2.width && obj1.y + obj1.height > obj2.y && obj1.y < obj2.y + obj2.height;
  }

  DisplayTilling(textureLoc, textureWidth, textureHeight) {
    var texture = PIXI.Texture.from(textureLoc);
    var tilling = new PIXI.TilingSprite(texture, textureWidth, textureHeight);
    tilling.position.set(0, 0);
    return tilling;
  }

  SpawnPowerUps(powerup, powerupChecker, screenY, screenX) {
    if (powerupChecker == false) {
      if (powerup.visible == false) {
        var randomX = Math.floor((Math.random() * (screenX - 50)) + screenX / 4);
        var randomY = Math.floor((Math.random() * 10) + (-10));
        powerup.x = randomX;
        powerup.y = randomY;
        powerup.visible = true;
      }
      if (powerup.y > screenY) {
        powerupChecker = true;
        powerup.visible = false;

      }
    }

  }

  movePowerUp(powerup, speed) {
    if (powerup.visible == true) {
      powerup.y += speed;
    }
  }
  PowerUpsCheck(powerupCondition, powerupbool, powerupIcon) {
    if (powerupCondition == true) {
      setTimeout(() => {
        powerupCondition = false;
        powerupbool = false;
        powerupIcon.alpha = 0.3;
      }, 4000);
    }
  }

  ExplosionAnimation() {
    let sheet = new PIXI.BaseTexture.from(Gametexture.explosion);
    let w = 256;
    let h = 256;

    let explosionsheet = [
      new PIXI.Texture(sheet, new PIXI.Rectangle(0, 0, w, h)),
      new PIXI.Texture(sheet, new PIXI.Rectangle(w, 0, w, h)),
      new PIXI.Texture(sheet, new PIXI.Rectangle(2 * w, 0, w, h)),
      new PIXI.Texture(sheet, new PIXI.Rectangle(0, h, w, h)),
      new PIXI.Texture(sheet, new PIXI.Rectangle(w, h, w, h)),
      new PIXI.Texture(sheet, new PIXI.Rectangle(2 * w, h, w, h)),
      new PIXI.Texture(sheet, new PIXI.Rectangle(0, 2 * h, w, h)),
      new PIXI.Texture(sheet, new PIXI.Rectangle(w, 2 * h, w, h)),
      new PIXI.Texture(sheet, new PIXI.Rectangle(2 * w, 2 * h, w, h))
    ];

    var explosion = new PIXI.AnimatedSprite(explosionsheet);
    explosion.scale.set(1);
    explosion.anchor.set(0.5);
    explosion.x = screenX / 2;
    explosion.y = screenY / 2,
    explosion.animationSpeed = 0.2;
    explosion.loop = false;
    explosion.visible = false;
    return explosion;

  }


}
let emitter;
export class Emitter {

  EmitterParticle(rocket, customiser) {
    var texture = PIXI.Texture.from("images/fire.png");
    const container = new PIXI.ParticleContainer(5000,
      {
        scale: true,
        position: true,
        rotation: false,
        uvs: false,
        tint: true
      });

    emitter = new particles.Emitter(container, [texture], {
      autoUpdate: true,
      "alpha": {
        "start": 1,
        "end": 0.56
      },
      "scale": {
        "start": 0.07 * customiser,
        "end": 0.09 * customiser,
        "minimumScaleMultiplier": 2
      },
      "color": {
        "start": "#ffffff",
        "end": "#ffffff"
      },
      "speed": {
        "start": 150,
        "end": 300,
        "minimumSpeedMultiplier": 2
      },
      "acceleration": {
        "x": 30,
        "y": 20
      },
      "maxSpeed": 0,
      "startRotation": {
        "min": 150,
        "max": 190
      },
      "noRotation": false,
      "rotationSpeed": {
        "min": 10,
        "max": 50
      },
      "lifetime": {
        "min": 0.5,
        "max": 1.2
      },
      "blendMode": "multiply",
      "frequency": 0.0001,
      "emitterLifetime": -0.5,
      "maxParticles": 1000,
      "pos": {
        "x": -1,
        "y": 0
      },
      "addAtBack": false,
      "spawnType": "point"
    });


    emitter.updateOwnerPos(rocket.x + (13 * customiser), rocket.y + (30 * customiser));
    emitter.rotation = 280;

    return container;
  }

  moveEmitter(posx, posy) {
    emitter.updateOwnerPos(posx, posy);
  }
}   