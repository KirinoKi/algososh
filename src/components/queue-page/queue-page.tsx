import React, { useEffect, useState } from "react";
import { SHORT_DELAY_IN_MS } from "../../constants/delays";
import { ElementStates } from "../../types/element-states";
import { Queue, TQueueElement } from "../../utils/queue";
import { delay } from "../../utils/utils";
import { Button } from "../ui/button/button";
import { Circle } from "../ui/circle/circle";
import { Input } from "../ui/input/input";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";

import style from "./queue-page.module.css";

const sizeQueue: number = 7;
const queue = new Queue<string>(sizeQueue);

export const QueuePage: React.FC = () => {
  const initArr: Array<TQueueElement> = Array.from(
    { length: sizeQueue },
    () => ({
      item: "",
      state: ElementStates.Default,
      head: false,
      tail: false,
    })
  );

  const [input, setInput] = useState<string>("");
  const [queueArray, setQueueArray] = useState<Array<TQueueElement>>(initArr);
  const [addBtn, setAddBtn] = useState<boolean>(true);
  const [clearBtn, setClearBtn] = useState<boolean>(false);

  const [loader, setLoader] = React.useState({ add: false, delete: false, remove: false });

  useEffect(() => {
    !input ? setAddBtn(true) : setAddBtn(false);
    if (queue.isFull()) {
      setAddBtn(true);
    }
  }, [input]);

  useEffect(() => {
    queueArray.some((item) => {
      return item.item !== "";
    })
      ? setClearBtn(false)
      : setClearBtn(true);
  }, [queueArray]);

  const handlerChangeInput = (e: React.SyntheticEvent<HTMLInputElement>) => {
    setInput(e.currentTarget.value);
  };

  const handlerAddItem = async () => {
    queue.enqueue(input);
    setLoader({ ...loader, add: true });
    queueArray[queue.getHead()].head = true;
    if (queue.getTail() > 0) {
      queueArray[queue.getTail() - 1].tail = false;
    }

    queueArray[queue.getTail()].item = input;
    queueArray[queue.getTail()].state = ElementStates.Changing;
    queueArray[queue.getTail()].tail = true;
    setInput("");
    await delay(SHORT_DELAY_IN_MS);
    queueArray[queue.getTail()].state = ElementStates.Default;
    setQueueArray([...queueArray]);
    setLoader({ ...loader, add: false });
  };

  const handlerRemoveItem = async () => {
    if (queue.getHead() === queue.getTail()) {
      setLoader({ ...loader, delete: true });
      queueArray[queue.getHead()].state = ElementStates.Changing;
      setQueueArray([...queueArray]);
      await delay(SHORT_DELAY_IN_MS);
      queueArray[queue.getHead()].state = ElementStates.Default;

      handlerClearQueue();
      setLoader({ ...loader, delete: false });
    } else {
      setLoader({ ...loader, delete: true });
      setQueueArray([...queueArray]);
      queue.dequeue();
      queueArray[queue.getHead() - 1].state = ElementStates.Changing;
      await delay(SHORT_DELAY_IN_MS);

      queueArray[queue.getHead() - 1].state = ElementStates.Default;

      if (queue.getHead() > 0) {
        queueArray[queue.getHead() - 1].head = false;
        queueArray[queue.getHead() - 1].item = "";
      }
      queueArray[queue.getHead()].head = true;
      setQueueArray([...queueArray]);
      setLoader({ ...loader, delete: false });
    }
  };

  const handlerClearQueue = async () => {
    queue.clear();
    setLoader({ ...loader, remove: true });
    setQueueArray([...initArr]);
    setInput("");
    await delay(SHORT_DELAY_IN_MS);
    setLoader({ ...loader, remove: false });
  };

  return (
    <SolutionLayout title="Очередь">
      <div className={style.container}>
        <div className={style.container_buttons}>
          <Input
            extraClass={style.input}
            onChange={handlerChangeInput}
            placeholder="Введите текст"
            maxLength={4}
            isLimitText
            value={input}
            data-cy="input-queue"
          />
          <Button
            onClick={handlerAddItem}
            text={"Добавить"}
            disabled={addBtn}
            isLoader={loader.add}
            data-cy="btn-add-queue"
          />
          <Button
            onClick={handlerRemoveItem}
            text={"Удалить"}
            disabled={clearBtn}
            isLoader={loader.delete}
            data-cy="btn-remove-queue"
          />
        </div>
        <Button
          onClick={handlerClearQueue}
          text={"Очистить"}
          disabled={clearBtn}
          isLoader={loader.remove}
          data-cy="btn-clear-queue"
        />
      </div>
      <div className={style.container__circle}>
        {queueArray?.map((item, index) => (
          <Circle
            key={index}
            state={item.state}
            letter={`${item.item}`}
            index={index}
            head={item.head ? "head" : ""}
            tail={item.tail ? "tail" : ""}
          />
        ))}
      </div>
    </SolutionLayout>
  );
};