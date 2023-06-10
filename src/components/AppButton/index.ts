import AppButton from './AppButton';

export interface Props {
  onPress: () => void;
  title: string;
  secondary?: boolean;
}

export default AppButton;
