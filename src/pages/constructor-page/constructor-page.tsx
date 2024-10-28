import { useSelector } from '../../services/store';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { DndProvider } from 'react-dnd';
import styles from './constructor-page.module.css';
import { BurgerIngredients } from '@components';
import { BurgerConstructor } from '@components';
import { Preloader } from '@ui';
import { FC, useState } from 'react';
import { getIngredientsLoadingSelector } from '../../services/slices/burgerIngredientsSlice';

export const ConstructorPage: FC = () => {
  /** TODO: взять переменную из стора */
  const isIngredientsLoading = useSelector(getIngredientsLoadingSelector);

  return (
    <DndProvider backend={HTML5Backend}>
      <>
        {isIngredientsLoading ? (
          <Preloader />
        ) : (
          <main className={styles.containerMain}>
            <h1
              className={`${styles.title} text text_type_main-large mt-10 mb-5 pl-5`}
            >
              Соберите бургер
            </h1>
            <div className={`${styles.main} pl-5 pr-5`}>
              <BurgerIngredients />
              <BurgerConstructor />
            </div>
          </main>
        )}
      </>
    </DndProvider>
  );
};
