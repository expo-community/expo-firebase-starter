import { useState } from 'react';

export const useTogglePasswordVisibility = () => {
  // password will not be initially visible
  const [passwordVisibility, setPasswordVisibility] = useState(true);
  const [rightIcon, setRightIcon] = useState('eye');
  const [confirmPasswordIcon, setConfirmPasswordIcon] = useState('eye');
  const [confirmPasswordVisibility, setConfirmPasswordVisibility] =
    useState(true);

  // function that toggles password visibility on a TextInput component on a password field
  const handlePasswordVisibility = () => {
    if (rightIcon === 'eye') {
      setRightIcon('eye-off');
      setPasswordVisibility(!passwordVisibility);
    } else if (rightIcon === 'eye-off') {
      setRightIcon('eye');
      setPasswordVisibility(!passwordVisibility);
    }
  };

  // function that toggles password visibility on a TextInput component on a confirm password field
  const handleConfirmPasswordVisibility = () => {
    if (confirmPasswordIcon === 'eye') {
      setConfirmPasswordIcon('eye-off');
      setConfirmPasswordVisibility(!confirmPasswordVisibility);
    } else if (confirmPasswordIcon === 'eye-off') {
      setConfirmPasswordIcon('eye');
      setConfirmPasswordVisibility(!confirmPasswordVisibility);
    }
  };

  return {
    passwordVisibility,
    handlePasswordVisibility,
    rightIcon,
    confirmPasswordVisibility,
    handleConfirmPasswordVisibility,
    confirmPasswordIcon
  };
};
