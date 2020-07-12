import * as R from 'ramda';
// icons
import * as I from './icons';
// ui
import { IconWrapper } from '../ui';
// //////////////////////////////////////////////////

const Icon = props => {
  const { iconName, handleClick } = props;
  const iconProps = R.pick(['w', 'h', 'color'], props);
  const styles = R.omit(['w', 'h', 'color', 'iconName', 'handleClick'], props);

  return (
    <IconWrapper {...styles} onClick={handleClick}>
      {I[iconName](iconProps)}
    </IconWrapper>
  );
};

export default Icon;
