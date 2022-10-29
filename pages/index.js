import { useEffect, useRef, useState } from "react";
import { Check, ArrowNarrowUp } from "tabler-icons-react";
import { motion, AnimatePresence } from "framer-motion";
import hints from "../secrets";
import Image from "next/image";
import { useRouter } from "next/router";

export default function Page() {
  const [mode, setMode] = useState("answer");

  const [canSubmit, setCanSubmit] = useState(false);
  const answerField = useRef(null);
  const dragConstraints = useRef(null);
  const [outOfBox, setOutOfBox] = useState(false);
  const [hintImage, setHint] = useState("");

  const [bulbs, setBulbs] = useState([
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
  ]);

  const [{ x, y }, setPointer] = useState({
    x: 0,
    y: 0,
  });

  useEffect(() => {
    const newArr = bulbs.map((value) => (value ? "1" : "0")).join("");
    if (hints[newArr]) {
      setHint(hints[newArr]);
    } else {
      setHint("");
    }
  }, [bulbs]);

  const router = useRouter();

  return (
    <motion.main
      onMouseMove={(e) => {
        setPointer({
          x: e.clientX,
          y: e.clientY,
        });
      }}
      ref={dragConstraints}
      onDoubleClick={() => setMode(mode === "answer" ? "hint" : "answer")}
      className="relative overflow-hidden w-full h-screen bg-gray-900 text-white flex flex-col justify-center items-center"
    >
      <AnimatePresence mode="wait">
        {/* Answer  */}
        {mode === "answer" && (
          <motion.div
            key="answer"
            initial={{
              opacity: 0,
            }}
            animate={{
              opacity: 1,
            }}
            exit={{
              opacity: 0,
            }}
          >
            <h1 className="font-tech text-center text-6xl text-red-400">
              Final Answer
            </h1>

            <div className="w-full flex mt-24 gap-x-4 items-center">
              <motion.input
                onChange={(e) => setCanSubmit(e.target.value.length > 0)}
                layout
                ref={answerField}
                type="text"
                className="font-tech text-2xl text-center px-6 bg-transparent py-3 w-full rounded-xl border-2 focus:border-red-400 focus:border-4"
              />
              {canSubmit && (
                <motion.button
                  initial={{
                    opacity: 0,
                  }}
                  animate={{
                    opacity: 1,
                  }}
                  layout
                  // TODO
                  // Confirm System
                  onClick={() => {
                    if (
                      confirm(
                        "Are you sure? This device will lock up if you are wrong."
                      ) &&
                      answerField.current.value ===
                        process.env.NEXT_PUBLIC_SECRET
                    ) {
                      router.push("/win");
                    }
                  }}
                  className="bg-green-400 rounded-full aspect-square w-12 h-12 grid place-items-center"
                >
                  <Check size={24} strokeWidth={2} color={"white"} />
                </motion.button>
              )}
            </div>
          </motion.div>
        )}
        {/* Hint Section */}
        {mode === "hint" && (
          <motion.div
            className="flex flex-col justify-center items-center gap-y-4"
            key="hint"
            initial={{
              opacity: 0,
            }}
            animate={{
              opacity: 1,
            }}
            exit={{
              opacity: 0,
            }}
          >
            <AnimatePresence mode="wait">
              {!outOfBox ? (
                <div className="flex flex-col justify-center items-center w-full">
                  <h1>Backdoor Mode</h1>
                  <p className="opacity-5">จงคิดนอกกรอบ</p>
                  <motion.div
                    drag
                    dragConstraints={dragConstraints}
                    dragMomentum={false}
                    onDrag={(event, info) => {
                      if (info.point.y < 0) {
                        setOutOfBox(true);
                      }
                    }}
                  >
                    <ArrowNarrowUp size={48} strokeWidth={2} color={"white"} />
                  </motion.div>
                </div>
              ) : (
                <>
                  <div className="flex w-full justify-around px-4 gap-x-4">
                    {bulbs.map((value, index) => {
                      return (
                        <motion.div
                          key={index}
                          layout
                          onClick={() => {
                            const newBulbs = [...bulbs];
                            newBulbs[index] = !newBulbs[index];
                            setBulbs(newBulbs);
                          }}
                          animate={{
                            backgroundColor: value ? "#00ff00" : "#000000",
                          }}
                          className={` w-16 h-16 rounded-full`}
                        ></motion.div>
                      );
                    })}
                  </div>
                  {hintImage.length ? (
                    <motion.div
                      className="w-96 h-96 absolute top-0 left-0"
                      animate={{
                        x,
                        y,
                      }}
                    >
                      <Image
                        width={400}
                        height={400}
                        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
                        alt=""
                        src={hintImage}
                      />
                    </motion.div>
                  ) : (
                    ""
                  )}
                </>
              )}
            </AnimatePresence>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.main>
  );
}
