import { useCustomForm } from '../../contexts/CustomFormContext.tsx';
import { CustomTextButton } from '../CustomButton/CustomTextButton.tsx';

type Props = {
  readonly label: string;
};

export function CustomFormSubmit({ label }: Props) {
  const { isSubmitting } = useCustomForm();
  return (
    <CustomTextButton label={label} type="submit" disabled={isSubmitting} />
  );
}
