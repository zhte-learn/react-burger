import { forwardRef} from 'react';
import groupStyle from './ingredients-group.module.css';
import { TBurgerIngredient } from '../../../utils/custom-types';
import IngredientItem from '../ingredient-item/ingredient-item';

type IngredientsGroupProps = {
  groupTitle: string;
  ingredients: TBurgerIngredient[];
  mRef?: React.Ref<HTMLDivElement>;
}

const IngredientsGroup = forwardRef<HTMLDivElement, IngredientsGroupProps>((props, ref): JSX.Element => {
  return (
    <div ref={ref} className={ groupStyle.group }>
      <h3 className="text text_type_main-medium mb-6">{ props.groupTitle }</h3>
      <ul className={`${groupStyle.list} pl-4 pr-4 mb-2`}>
        {props.ingredients.map((ingredient) => (
          <IngredientItem 
            key={ ingredient._id } 
            ingredient={ ingredient }
          />
        ))}
      </ul>
    </div>
  )
});

export default IngredientsGroup;
