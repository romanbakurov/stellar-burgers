import React, { FC, memo } from 'react';
import { Link } from 'react-router-dom';
import styles from './burger-ingredient.module.css';

import {
  Counter,
  CurrencyIcon,
  AddButton
} from '@zlden/react-developer-burger-ui-components';

import { TBurgerIngredientUIProps } from './type';
import { useDrag } from 'react-dnd';
import { TIngredient } from '@utils-types';

export const BurgerIngredientUI: FC<TBurgerIngredientUIProps> = memo(
  ({ ingredient, count, handleAdd, locationState }) => {
    const { image, price, name, _id } = ingredient;

    const [{ isDrag, dataDrag }, drag] = useDrag(() => ({
      type: 'ADD_CONSTRUCTOR',
      item: ingredient,
      collect: (monitor) => ({
        isDrag: monitor.isDragging(),
        dataDrag: monitor.getItem()
      })
    }));

    return (
      <li className={styles.container} style={{ opacity: isDrag ? 0.1 : 1 }}>
        <Link
          onClick={() => {}}
          className={styles.article}
          to={`/ingredients/${_id}`}
          state={locationState}
          ref={drag}
        >
          {count && <Counter count={count} />}
          <img className={styles.img} src={image} alt='картинка ингредиента.' />
          <div className={`${styles.cost} mt-2 mb-2`}>
            <p className='text text_type_digits-default mr-2'>{price}</p>
            <CurrencyIcon type='primary' />
          </div>
          <p className={`text text_type_main-default ${styles.text}`}>{name}</p>
        </Link>
        <AddButton
          text='Добавить'
          onClick={handleAdd}
          extraClass={`${styles.addButton} mt-8`}
        />
      </li>
    );
  }
);
