// import "./creature/CreaturePixiPackJSRenderer";
// import "./creature/CreaturePixiJSRenderer";
import "./creature/CreaturePixiJSRefRenderer";
import "./creature/CreatureMeshBone";
import "./creature/CreatureFlatData_generated";
import {
  Creature,
  CreatureAnimation,
  CreatureManager,
} from "./creature/CreatureMeshBone";
import { CreatureRenderer } from "./creature/CreaturePixiJSRefRenderer";
import * as PIXI from "pixi.js";
// declare var Creature: any;
// declare var CreatureAnimation: any;
// declare var CreatureManager: any;
// declare var CreatureRenderer: any;
export const runPixiTest = (stage: any) => {
  var xobj = new XMLHttpRequest();
  xobj.overrideMimeType("application/json");
  //xobj.open('GET', 'debug3Export_character_data.json', true); // Replace 'my_data' with the path to your file

  // Artwork by: Katarzyna Zalecka [http://kasia88.deviantart.com], Attribution-ShareAlike 3.0 Unported
  // Download Asset Files here: http://www.kestrelmoon.com/creaturedocs/Animation_Samples_And_Examples/Samples_And_Videos.html
  xobj.open("GET", "iceDemonExport_character_data.json", true); // Replace 'my_data' with the path to your file
  xobj.onreadystatechange = () => {
    if (xobj.readyState == 4 && xobj.status == 200) {
      // Required use of an anonymous callback as .open will NOT return a value but simply returns undefined in asynchronous mode
      //            callback(xobj.responseText);
      var response = xobj.responseText;
      // Parse JSON string into object
      var actual_JSON = JSON.parse(response);
      //document.write("Loaded JSON file: ");

      var new_creature = new Creature(actual_JSON, false);

      var new_animation_1 = new CreatureAnimation(
        actual_JSON,
        "default",
        false
      );

      //var new_animation_1 = new CreatureAnimation(actual_JSON, "idle", false);
      //var new_animation_2 = new CreatureAnimation(actual_JSON, "back", false);

      var new_manager = new CreatureManager(new_creature);
      new_manager.AddAnimation(new_animation_1);
      //new_manager.AddAnimation(new_animation_2);
      //new_manager.SetActiveAnimationName("idle", false);
      new_manager.SetActiveAnimationName("default", false);
      new_manager.SetShouldLoop(true);
      new_manager.SetIsPlaying(true);
      new_manager.RunAtTime(0);

      // create an new instance of a pixi stage
      // var stage = new PIXI.Container();

      // // create a renderer instance.
      // var renderer = new PIXI.Renderer({
      //   width: window.innerWidth,
      //   height: window.innerHeight,
      // });

      // add the renderer view element to the DOM
      //document.body.appendChild(renderer.view);

      // create a texture from an image path
      //var texture = PIXI.Texture.fromImage("debug3Export_character_img.png");
      var texture = PIXI.Texture.from("iceDemonExport_character_img.png");

      var creatureContainer = new PIXI.Container();
      creatureContainer.position.x = window.innerWidth / 3;
      creatureContainer.position.y = window.innerHeight / 3;

      creatureContainer.scale.set(25.0);
      stage.addChild(creatureContainer);

      var new_creature_renderer = new CreatureRenderer(new_manager, texture);
      creatureContainer.addChild(new_creature_renderer);
      creatureContainer.scale.x = creatureContainer.scale.x;

      const animate = () => {
        requestAnimationFrame(animate);

        new_manager.Update(0.025);
        new_creature_renderer.refresh();

        // render the stage
        //renderer.render(stage);
      };

      animate();
    }
  };
  xobj.send(null);
};
