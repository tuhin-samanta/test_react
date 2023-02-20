import { useState, useEffect } from "react";
import "./App.css";

const offColor = "#09162E";

let init = false;

function App() {
  const [config, updateLights] = useState({
    lights: [
      { color: "lime", duration: 5, shadowColor: "rgba(130,201,106,1)" },
      { color: "yellow", duration: 2, shadowColor: "rgba(189,179,64,1)" },
      { color: "red", duration: 5, shadowColor: "rgba(194,29,76,1)" },
    ],
  });

  const lights = config.lights;

  const [active, setActive] = useState({
    reverse: false,
    index: 0,
    timer: 0,
  });

  useEffect(() => {
    doCiculate(lights, active, setActive);
  }, []);

  return (
    <>
      <div className="container">
        <div className="timer">
          <span className="count">{active.timer}</span>
          <span>s</span>
        </div>
        <div className="lights">
          {lights.map((light, index) => (
            <div
              key={index}
              className="lite"
              style={{
                backgroundColor:
                  index === active.index ? light.color : offColor,
                boxShadow:
                  index === active.index
                    ? `0px 0px 24px -1px ${light.shadowColor}`
                    : null,
              }}
            ></div>
          ))}
        </div>
      </div>
    </>
  );
}

function doCiculate(lights, active, setActive) {
  if (!init) {
    init = true;
    setInterval(() => {
      setActive((active) => {
        active = { ...active };
        let light = lights[active.index];

        if (active.timer === light.duration) {
          active.timer = 0;
          if (lights.length - 1 === active.index) {
            active.reverse = true;
          }

          if (active.reverse) {
            if (active.index === 0) {
              active.reverse = false;
            }
          }

          if (!active.reverse) {
            ++active.index;
          } else {
            --active.index;
          }
        } else {
          ++active.timer;
        }
        return active;
      });
    }, 1000);
  }
}

export default App;
