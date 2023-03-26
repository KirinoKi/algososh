import React, { useEffect, useState } from "react";
import { Direction } from "../../types/direction";
import { ElementStates } from "../../types/element-states";
import { SortMethod, SortType, TItem, TItemArray } from "../../types/utils";
import { bubbleSort, selectionSort } from "../../utils/sotring";
import { getRandomArr } from "../../utils/utils";
import { Button } from "../ui/button/button";
import { Column } from "../ui/column/column";
import { RadioInput } from "../ui/radio-input/radio-input";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";

import style from "./sorting-page.module.css";

export const SortingPage: React.FC = () => {
  const [disabled, setDisabled] = useState<boolean>(false);
  const [methodSort, setMethodSort] = useState<SortMethod>(SortMethod.Choise);
  const [array, setArray] = useState<Array<TItemArray<TItem>>>([]);

  const [loaderAsc, setLoaderAsc] = useState<boolean>(false);
  const [loaderDesc, setLoaderDesc] = useState<boolean>(false);

  const generateArray = () => {
    setArray(
      getRandomArr(0, 100).map((item: number) => {
        return {
          item,
          state: ElementStates.Default,
        };
      })
    );
  };

  useEffect(() => {
    generateArray();
  }, []);

  const handlerSort = async (
    array: Array<TItemArray<TItem>>,
    sortType: SortType,
    sortMethod: SortMethod
  ) => {
    setDisabled(true);
    sortType === SortType.Asc ? setLoaderAsc(true) : setLoaderDesc(true);
    if (sortMethod === SortMethod.Choise) {
      await selectionSort(array, sortType, setArray);
    } else {
      await bubbleSort(array, sortType, setArray);
    }
    setDisabled(false);
    setLoaderAsc(false);
    setLoaderDesc(false);
  };

  const handlerChoiseMethodSort = (
    e: React.SyntheticEvent<HTMLInputElement>
  ) => {
    const method = e.currentTarget.value;
    if (method === SortMethod.Choise) {
      setMethodSort(method);
    } else if (method === SortMethod.Bubble) {
      setMethodSort(method);
    }
  };

  return (
    <SolutionLayout title="Сортировка массива">
      <div className={style.container}>
        <div className={style.radioBtn__group}>
          <RadioInput
            label="Выбор"
            defaultChecked
            defaultValue={SortMethod.Choise}
            name="radio"
            disabled={disabled}
            onClick={handlerChoiseMethodSort}
          />
          <RadioInput
            label="Пузырёк"
            defaultValue={SortMethod.Bubble}
            name="radio"
            disabled={disabled}
            onClick={handlerChoiseMethodSort}
          />
        </div>
        <div className={style.btn__group}>
          <Button
            text="По возрастанию"
            sorting={Direction.Ascending}
            disabled={disabled}
            isLoader={loaderAsc}
            onClick={() => handlerSort(array, SortType.Asc, methodSort)}
          />
          <Button
            text="По убыванию"
            sorting={Direction.Descending}
            disabled={disabled}
            isLoader={loaderDesc}
            onClick={() => handlerSort(array, SortType.Desc, methodSort)}
          />
        </div>
        <Button
          text="Новый массив"
          onClick={generateArray}
          disabled={disabled}
        />
      </div>
      <div className={style.container__array}>
        {array?.map((item, index) => (
          <Column index={+item.item} state={item.state} key={index} />
        ))}
      </div>
    </SolutionLayout>
  );
};
