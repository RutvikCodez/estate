type IconName = ComponentProps<typeof Ionicons>["name"];

type TabType = {
  name: string;
  title: string;
  icon: IconName;
}

type InputFieldProps = {
  placeholder: string;
  value: string;
  onChangeText: (text: string) => void;
  secureTextEntry?: boolean;
  keyboardType?: "default" | "email-address" | "number-pad";
  error?: string;
  containerClassName?: string; 
};

type FormState = {
  firstName?: string;
  lastName?: string;
  email: string;
  password: string;
  code: string;
};

type HeaderType = {
    title: string;
    subtitle: string;   
}

type VerifyProps = {
  form: FormState;
  update: (key: keyof FormState) => (value: string) => void;
  onVerify: () => void;
  resend: () => void;
  reset: () => void;
  loading: boolean;
  error?: string;
};

type ButtonProps = {
  text: string;
  onPress: () => void;
  loading?: boolean;
};

type TextBtnProps = {
  text: string;
  onPress: () => void;
};

type SignUpProps = {
  form: FormState;
  update: (key: keyof FormState) => (value: string) => void;
  onSubmit: () => void;
  loading: boolean;
  errors: any; 
  isSignIn?: boolean;
};

type UserStore = {
  isAdmin: boolean;
  setIsAdmin: (isAdmin: boolean) => void;
}