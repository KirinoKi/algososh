import React, { useState } from "react";
import { DELAY_IN_MS } from "../../constants/delays";
import { ElementStates } from "../../types/element-states";
import { LinkedList, TListElement } from "../../utils/list";
import { delay } from "../../utils/utils";
import { Button } from "../ui/button/button";
import { Circle } from "../ui/circle/circle";
import { ArrowIcon } from "../ui/icons/arrow-icon";
import { Input } from "../ui/input/input";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";

import style from "./list-page.module.css";

const startArray = [2, 34, 8, 1];
const linkedList = new LinkedList<string | number>(startArray);

export const ListPage: React.FC = () => {
  const initArr: Array<TListElement> = startArray.map((item, index, array) => ({
    item: `${item}`,
    state: ElementStates.Default,
    head: index === 0 ? true : false,
    tail: index === array.length - 1 ? true : false,
    isAdded: false,
    isRemoved: false,
    newCircle: null,
  }));

  const [inputValue, setInputValue] = useState<string>("");
  const [inputIndex, setInputIndex] = useState<number>(0);
  const [listArray, setListArray] = useState<Array<TListElement>>(initArr);
  const [addHead, setAddHead] = useState<boolean>(false);
  const [addTail, setAddTail] = useState<boolean>(false);
  const [removeHead, setRemoveHead] = useState<boolean>(false);
  const [removeTail, setRemoveTail] = useState<boolean>(false);
  const [addByIndex, setAddByIndex] = useState<boolean>(false);
  const [removeByIndex, setRemoveByIndex] = useState<boolean>(false);

  const handlerChangeInput = (e: React.SyntheticEvent<HTMLInputElement>) => {
    if (e.currentTarget.type === "text") {
      setInputValue(e.currentTarget.value);
    } else {
      setInputIndex(+e.currentTarget.value);
    }
  };

  const handlerAddHead = async () => {
    setAddHead(true);
    linkedList.prepend(inputValue);

    if (linkedList.getSize() > 1) {
      listArray[0] = {
        ...listArray[0],
        isAdded: true,
        head: false,
        newCircle: { item: inputValue },
        state: ElementStates.Changing,
      };
    } else {
      listArray[0] = {
        item: inputValue,
        isAdded: true,
        head: true,
        newCircle: null,
        state: ElementStates.Changing,
      };
    }
    setListArray([...listArray]);

    await delay(DELAY_IN_MS);

    if (linkedList.getSize() > 1) {
      listArray[0] = {
        ...listArray[0],
        isAdded: false,
        head: false,
        newCircle: null,
        state: ElementStates.Default,
      };
    } else {
      listArray[0] = {
        item: inputValue,
        isAdded: false,
        head: true,
        tail: true,
        newCircle: null,
        state: ElementStates.Default,
      };
    }
    setListArray([...listArray]);

    await delay(DELAY_IN_MS);

    if (linkedList.getSize() > 1) {
      listArray.unshift({ item: inputValue, state: ElementStates.Modified });
      setListArray([...listArray]);
      await delay(DELAY_IN_MS);
    }

    listArray[0] = {
      ...listArray[0],
      state: ElementStates.Default,
      head: true,
    };
    setListArray([...listArray]);
    setInputValue("");
    setAddHead(false);
  };

  const handlerAddTail = async () => {
    setAddTail(true);
    linkedList.append(inputValue);

    if (linkedList.getSize() > 0) {
      listArray[listArray.length - 1] = {
        ...listArray[listArray.length - 1],
        tail: false,
        isAdded: true,
        newCircle: { item: inputValue },
        state: ElementStates.Changing,
      };
    } else {
      listArray[0] = {
        item: inputValue,
        head: true,
        tail: true,
        isAdded: true,
        newCircle: null,
        state: ElementStates.Changing,
      };
    }
    setListArray([...listArray]);

    await delay(DELAY_IN_MS);

    if (linkedList.getSize() > 0) {
      listArray[listArray.length - 1] = {
        ...listArray[listArray.length - 1],
        tail: false,
        isAdded: false,
        newCircle: null,
        state: ElementStates.Default,
      };
    } else {
      listArray[0] = {
        item: inputValue,
        head: true,
        tail: true,
        isAdded: false,
        newCircle: null,
        state: ElementStates.Default,
      };
    }

    setListArray([...listArray]);

    await delay(DELAY_IN_MS);

    if (linkedList.getSize() > 0) {
      listArray.push({ item: inputValue, state: ElementStates.Modified });
      setListArray([...listArray]);
      await delay(DELAY_IN_MS);
    }

    listArray[listArray.length - 1] = {
      ...listArray[listArray.length - 1],
      tail: true,
      state: ElementStates.Default,
    };
    listArray[listArray.length - 2] = {
      ...listArray[listArray.length - 2],
      tail: false,
    };
    setListArray([...listArray]);
    setInputValue("");
    setAddTail(false);
  };

  const handlerRemoveHead = async () => {
    setRemoveHead(true);
    linkedList.deleteHead();
    if (linkedList.getSize() > 0) {
      listArray[0] = {
        ...listArray[0],
        head: false,
        state: ElementStates.Changing,
        item: "",
        isRemoved: true,
        newCircle: { item: listArray[0].item },
      };
    } else {
      listArray[0] = {
        ...listArray[0],
        head: false,
        tail: false,
        state: ElementStates.Changing,
        item: "",
        isRemoved: true,
        newCircle: { item: listArray[0].item },
      };
    }
    setListArray([...listArray]);

    await delay(DELAY_IN_MS);

    listArray[0].state = ElementStates.Modified;
    listArray.shift();
    setListArray([...listArray]);

    await delay(DELAY_IN_MS);
    if (linkedList.getSize() > 0) {
      listArray[0] = {
        ...listArray[0],
        state: ElementStates.Default,
        head: true,
      };
      setListArray([...listArray]);
    }
    setInputValue("");
    setRemoveHead(false);
  };

  const handlerRemoveTail = async () => {
    setRemoveTail(true);
    linkedList.deleteTail();
    listArray[listArray.length - 1] = {
      ...listArray[listArray.length - 1],
      tail: false,
      state: ElementStates.Changing,
      item: "",
      isRemoved: true,
      newCircle: { item: listArray[listArray.length - 1].item },
    };
    setListArray([...listArray]);
    await delay(DELAY_IN_MS);

    if (linkedList.getSize() > 0) {
      listArray.pop();
      listArray[listArray.length - 1].state = ElementStates.Modified;
      setListArray([...listArray]);

      await delay(DELAY_IN_MS);

      listArray[listArray.length - 1].state = ElementStates.Default;
      listArray[listArray.length - 1].tail = true;
    } else {
      listArray.pop();
    }

    setListArray([...listArray]);
    setInputValue("");
    setRemoveTail(false);
  };

  const handlerAddByIndex = async () => {
    setAddByIndex(true);
    linkedList.insertAt(inputValue, inputIndex);
    for (let i = 0; i <= inputIndex; i++) {
      listArray[i] = {
        ...listArray[i],
        state: ElementStates.Changing,
        isAdded: true,
        newCircle: { item: inputValue },
      };
      if (i > 0) {
        listArray[i - 1] = {
          ...listArray[i - 1],
          state: ElementStates.Changing,
          isAdded: false,
          newCircle: null,
        };
      }
      setListArray([...listArray]);

      await delay(DELAY_IN_MS);
    }
    listArray[inputIndex] = {
      ...listArray[inputIndex!],
      isAdded: false,
      newCircle: null,
    };
    listArray.splice(inputIndex, 0, {
      item: inputValue,
      state: ElementStates.Modified,
    });
    setListArray([...listArray]);

    await delay(DELAY_IN_MS);

    listArray.forEach((item) => (item.state = ElementStates.Default));
    setListArray([...listArray]);
    listArray[1].head = false;
    listArray[0].head = true;
    setListArray([...listArray]);
    setInputValue("");
    setInputIndex(0);
    setAddByIndex(false);
  };

  const handlerRemoveByIndex = async () => {
    setRemoveByIndex(true);
    for (let i = 0; i <= inputIndex; i++) {
      listArray[i].state = ElementStates.Changing;
      setListArray([...listArray]);

      await delay(DELAY_IN_MS);
    }
    listArray[inputIndex] = {
      ...listArray[inputIndex],
      item: "",
      isRemoved: true,
      newCircle: { item: listArray[inputIndex].item },
    };
    setListArray([...listArray]);

    await delay(DELAY_IN_MS);

    listArray.splice(inputIndex, 1);
    setListArray([...listArray]);

    await delay(DELAY_IN_MS);

    listArray.forEach((item) => (item.state = ElementStates.Default));
    setListArray([...listArray]);

    listArray[listArray.length - 1].tail = true;
    listArray[0].head = true;
    setListArray([...listArray]);
    setInputValue("");
    setInputIndex(0);
    setRemoveByIndex(false);
  };

  const isDisabledBtnAdd = inputValue === "" || listArray.length > 5;
  const isDisabledBtnRemove = listArray.length < 1;

  return (
    <SolutionLayout title="Связный список">
      <div className={style.container}>
        <Input
          placeholder="Введите значение"
          onChange={handlerChangeInput}
          maxLength={4}
          isLimitText
          value={inputValue}
          disabled={listArray.length > 5}
          data-cy="input-value-list"
        />
        <Button
          extraClass={style.btn__value}
          text={"Добавить в head"}
          onClick={handlerAddHead}
          disabled={
            addTail ||
            removeHead ||
            removeTail ||
            addByIndex ||
            removeByIndex ||
            isDisabledBtnAdd
          }
          isLoader={addHead}
          data-cy="btn-add-head-list"
        />
        <Button
          extraClass={style.btn__value}
          text={"Добавить в tail"}
          onClick={handlerAddTail}
          disabled={
            addHead ||
            removeHead ||
            removeTail ||
            addByIndex ||
            removeByIndex ||
            isDisabledBtnAdd
          }
          isLoader={addTail}
          data-cy="btn-add-tail-list"
        />
        <Button
          extraClass={style.btn__value}
          text={"Удалить из head"}
          onClick={handlerRemoveHead}
          disabled={
            addHead ||
            addTail ||
            removeTail ||
            addByIndex ||
            removeByIndex ||
            isDisabledBtnRemove
          }
          isLoader={removeHead}
          data-cy="btn-remove-head-list"
        />
        <Button
          extraClass={style.btn__value}
          text={"Удалить из tail"}
          onClick={handlerRemoveTail}
          disabled={
            addHead ||
            addTail ||
            removeHead ||
            addByIndex ||
            removeByIndex ||
            isDisabledBtnRemove
          }
          isLoader={removeTail}
          data-cy="btn-remove-tail-list"
        />
      </div>
      <div className={style.container}>
        <Input
          placeholder="Введите индекс"
          type={"number"}
          max={listArray.length - 1}
          min={0}
          onChange={handlerChangeInput}
          value={inputIndex}
          data-cy="input-index-list"
        />
        <Button
          extraClass={style.btn__index}
          text={"Добавить по индексу"}
          onClick={handlerAddByIndex}
          disabled={
            addHead ||
            addTail ||
            removeHead ||
            removeTail ||
            removeByIndex ||
            (inputIndex !== 0 && inputValue === "") ||
            !inputIndex ||
            listArray.length >= 8 ||
            +inputIndex > listArray.length - 1
          }
          isLoader={addByIndex}
          data-cy="btn-add-byIndex-list"
        />
        <Button
          extraClass={style.btn__index}
          text={"Удалить по индексу"}
          onClick={handlerRemoveByIndex}
          disabled={
            addHead ||
            addTail ||
            removeHead ||
            removeTail ||
            addByIndex ||
            listArray.length <= 1 ||
            !inputIndex ||
            +inputIndex > listArray.length - 1
          }
          isLoader={removeByIndex}
          data-cy="btn-remove-byIndex-list"
        />
      </div>
      <div className={style.container__circle}>
        {listArray.map((item, index) => (
          <div className={style.circle} key={index}>
            <Circle
              key={index}
              index={index}
              letter={"" + item.item}
              head={item.head ? "head" : ""}
              tail={item.tail ? "tail" : ""}
              state={item.state}
              data-cy="test1"
            />
            {index < listArray.length - 1 && (
              <ArrowIcon
                fill={
                  item.state === ElementStates.Changing ? "#d252e1" : "#0032ff"
                }
              />
            )}

            {item.isAdded && item.newCircle?.item !== undefined && (
              <Circle
                isSmall={true}
                state={ElementStates.Changing}
                letter={"" + item.newCircle.item}
                extraClass={style.circle__add}
              />
            )}

            {item.isRemoved && item.newCircle?.item !== null && (
              <Circle
                isSmall={true}
                state={ElementStates.Changing}
                letter={"" + item.newCircle?.item}
                extraClass={style.circle__remove}
              />
            )}
          </div>
        ))}
      </div>
    </SolutionLayout>
  );
};
