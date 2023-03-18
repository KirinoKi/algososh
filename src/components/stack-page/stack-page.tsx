import React, { useEffect, useState } from "react";
import { SHORT_DELAY_IN_MS } from "../../constants/delays";
import { ElementStates } from "../../types/element-states";
import { Stack, TStackElement } from "../../utils/stack";
import { delay } from "../../utils/utils";
import { Button } from "../ui/button/button";
import { Circle } from "../ui/circle/circle";
import { Input } from "../ui/input/input";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";

import style from "./stack-page.module.css";

export const StackPage: React.FC = () => {
  const stack = new Stack<string>();

  const [input, setInput] = useState<string>("");
  const [stackArray, setStackArray] = useState<Array<TStackElement>>([]);
  const [addBtn, setAddBtn] = useState<boolean>(true);
  const [clearBtn, setClearBtn] = useState<boolean>(true);
  const [loader, setLoader] = React.useState({ add: false, delete: false, remove: false });

  useEffect(() => {
    !input ? setAddBtn(true) : setAddBtn(false);
  }, [input]);

  useEffect(() => {
    stackArray.length > 0 ? setClearBtn(false) : setClearBtn(true);
  }, [stackArray]);

  const handlerChangeInput = (e: React.SyntheticEvent<HTMLInputElement>) => {
    setInput(e.currentTarget.value);
  };

  const handlerAddItem = async () => {
    stack.push(input);
    setLoader({ ...loader, add: true });
    stackArray.push({ item: stack.peak(), state: ElementStates.Changing });
    setStackArray([...stackArray]);
    setInput("");
    await delay(SHORT_DELAY_IN_MS);

    stackArray[stackArray.length - 1].state = ElementStates.Default;
    setStackArray([...stackArray]);
    setLoader({ ...loader, add: false });
  };

  const handlerRemoveItem = async () => {
    stack.pop();
    setLoader({ ...loader, delete: true });
    stackArray[stackArray.length - 1].state = ElementStates.Changing;
    setStackArray([...stackArray]);
    await delay(SHORT_DELAY_IN_MS);
    stackArray.pop();
    setStackArray([...stackArray]);
    setLoader({ ...loader, delete: false });
  };

  const handlerClearStack = async () => {
    stack.clearStack();
    setLoader({ ...loader, remove: true });
    setStackArray([]);
    await delay(SHORT_DELAY_IN_MS);
    setLoader({ ...loader, remove: false });
  };

  return (
    <SolutionLayout title="Стек">
      <div className={style.container}>
        <div className={style.container_buttons}>
          <Input
            extraClass={style.input}
            onChange={handlerChangeInput}
            placeholder="Введите текст"
            maxLength={4}
            isLimitText
            value={input}
          />
          <Button
            onClick={handlerAddItem}
            text={"Добавить"}
            disabled={addBtn}
            isLoader={loader.add}
          />
          <Button
            onClick={handlerRemoveItem}
            text={"Удалить"}
            disabled={clearBtn}
            isLoader={loader.delete}
          />
        </div>
        <Button
          onClick={handlerClearStack}
          text={"Очистить"}
          disabled={clearBtn}
          isLoader={loader.remove}
        />
      </div>
      <div className={style.container__circle}>
        {stackArray?.map((item, index) => (
          <Circle
            key={index}
            state={item.state}
            letter={`${item.item}`}
            index={index}
            head={index === stackArray.length - 1 ? "top" : ""}
          />
        ))}
      </div>
    </SolutionLayout>
  );
};