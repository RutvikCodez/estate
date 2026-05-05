// import { View, ScrollView } from "react-native";
// import React, { useState } from "react";
// import { useSignIn } from "@clerk/expo";
// import { useRouter } from "expo-router";
// import { Header } from "@/components/Header";
// import { VerifyUI } from "@/components/VerifyUI";
// import { SignUpUI } from "@/components/SignUpUI";

// export default function SignIn() {
//   const { signIn, errors, fetchStatus } = useSignIn();
//   const router = useRouter();

//   const [form, setForm] = useState<FormState>({
//     email: "",
//     password: "",
//     code: "",
//   });

//   const isLoading = fetchStatus === "fetching";
//   const update = (k: keyof FormState) => (v: string) =>
//     setForm((p) => ({ ...p, [k]: v }));

//   const onSignIn = async () => {
//     const { error } = await signIn.password({
//       emailAddress: form.email,
//       password: form.password,
//     });

//     if (error) return alert(error.message);
//     if (signIn.status === "complete") {
//       await signIn.finalize({
//         navigate: ({ session, decorateUrl }) => {
//           if (!session.currentTask) {
//             router.replace(decorateUrl("/") as any);
//           }
//         },
//       });
//     } else if (signIn.status === "needs_second_factor") {
//       await signIn.mfa.sendPhoneCode();
//     } else if (signIn.status === "needs_client_trust") {
//       const emailCodeFactor = signIn.supportedSecondFactors.find(
//         (factor) => factor.strategy === "email_code",
//       );
//       if (emailCodeFactor) {
//         await signIn.mfa.sendEmailCode();
//       }
//     } else {
//       console.error("Sign-in attempt not complete:", signIn);
//     }
//   };

//   const onVerify = async () => {
//     await signIn.mfa.verifyEmailCode({ code: form.code });

//     if (signIn.status === "complete") {
//       await signIn.finalize({
//         navigate: ({ session, decorateUrl }) => {
//           if (!session.currentTask) {
//             router.replace(decorateUrl("/") as any);
//           }
//         },
//       });
//     }
//   };

//   const isVerifyScreen = signIn.status === "needs_client_trust";

//   return (
//     <ScrollView className="bg-white" contentContainerStyle={{ flexGrow: 1 }}>
//       <View className="flex-1 justify-center px-6 py-12 gap-8">
//         <Header
//           title={isVerifyScreen ? "Verify your account" : "Welcome back"}
//           subtitle={
//             isVerifyScreen
//               ? `We sent a code to ${form.email}`
//               : "Sign in to your account"
//           }
//         />

//         {isVerifyScreen ? (
//           <VerifyUI
//             form={form}
//             update={update}
//             onVerify={onVerify}
//             resend={() => signIn.mfa.sendEmailCode()}
//             reset={() => signIn.reset()}
//             loading={isLoading}
//             error={errors?.fields?.code?.message}
//           />
//         ) : (
//           <SignUpUI
//             form={form}
//             update={update}
//             onSubmit={onSignIn}
//             loading={isLoading}
//             errors={errors}
//             isSignIn={true}
//           />
//         )}
//       </View>
//     </ScrollView>
//   );
// }
import { View, ScrollView } from "react-native";
import React, { useState } from "react";
import { useSignIn } from "@clerk/expo";
import { useRouter } from "expo-router";
import { Header } from "@/components/Header";
import { VerifyUI } from "@/components/VerifyUI";
import { SignUpUI } from "@/components/SignUpUI";

export default function SignIn() {
  const { signIn, errors, fetchStatus } = useSignIn();
  const router = useRouter();

  const [form, setForm] = useState<FormState>({
    email: "",
    password: "",
    code: "",
  });

  const isLoading = fetchStatus === "fetching";

  const update = (k: keyof FormState) => (v: string) => {
    console.log(`Updating ${k}:`, v);
    setForm((p) => ({ ...p, [k]: v }));
  };

  const onSignIn = async () => {
    console.log("---- SIGN IN START ----");
    console.log("Email:", form.email);
    console.log("Password:", form.password);

    try {
      const res = await signIn.password({
        emailAddress: form.email,
        password: form.password,
      });

      console.log("SignIn Response:", res);
      console.log("SignIn Status:", signIn.status);

      if (res.error) {
        console.log("SignIn Error:", res.error);
        return alert(res.error.message);
      }

      if (signIn.status === "complete") {
        console.log("SignIn COMPLETE → Finalizing session");

        await signIn.finalize({
          navigate: ({ session, decorateUrl }) => {
            console.log("Session:", session);

            if (!session.currentTask) {
              console.log("Navigating to home");
              router.replace(decorateUrl("/") as any);
            }
          },
        });
      } 
      else if (signIn.status === "needs_second_factor") {
        console.log("Needs second factor → Sending phone OTP");

        await signIn.mfa.sendPhoneCode();
        console.log("Phone OTP sent");
      } 
      else if (signIn.status === "needs_client_trust") {
        console.log("Needs email verification (OTP)");

        const emailCodeFactor = signIn.supportedSecondFactors.find(
          (factor) => factor.strategy === "email_code",
        );

        console.log("Supported Factors:", signIn.supportedSecondFactors);

        if (emailCodeFactor) {
          console.log("Sending Email OTP...");
          await signIn.mfa.sendEmailCode();
          console.log("Email OTP sent");
        } else {
          console.log("Email factor NOT found!");
        }
      } 
      else {
        console.log("Unhandled SignIn status:", signIn.status);
      }

    } catch (err) {
      console.log("SignIn Exception:", err);
    }

    console.log("---- SIGN IN END ----");
  };

  const onVerify = async () => {
    console.log("---- VERIFY START ----");
    console.log("Entered Code:", form.code);

    try {
      const res = await signIn.mfa.verifyEmailCode({ code: form.code });

      console.log("Verify Response:", res);
      console.log("SignIn Status After Verify:", signIn.status);

      if (signIn.status === "complete") {
        console.log("Verification COMPLETE → Finalizing");

        await signIn.finalize({
          navigate: ({ session, decorateUrl }) => {
            console.log("Session:", session);

            if (!session.currentTask) {
              console.log("Navigating to home");
              router.replace(decorateUrl("/") as any);
            }
          },
        });
      } else {
        console.log("Verification not complete:", signIn.status);
      }

    } catch (err) {
      console.log("Verification Error:", err);
    }

    console.log("---- VERIFY END ----");
  };

  const isVerifyScreen = signIn.status === "needs_client_trust";

  console.log("Render → Status:", signIn.status);

  return (
    <ScrollView className="bg-white" contentContainerStyle={{ flexGrow: 1 }}>
      <View className="flex-1 justify-center px-6 py-12 gap-8">
        <Header
          title={isVerifyScreen ? "Verify your account" : "Welcome back"}
          subtitle={
            isVerifyScreen
              ? `We sent a code to ${form.email}`
              : "Sign in to your account"
          }
        />

        {isVerifyScreen ? (
          <VerifyUI
            form={form}
            update={update}
            onVerify={onVerify}
            resend={() => {
              console.log("Resending Email OTP...");
              signIn.mfa.sendEmailCode();
            }}
            reset={() => {
              console.log("Resetting SignIn...");
              signIn.reset();
            }}
            loading={isLoading}
            error={errors?.fields?.code?.message}
          />
        ) : (
          <SignUpUI
            form={form}
            update={update}
            onSubmit={onSignIn}
            loading={isLoading}
            errors={errors}
            isSignIn={true}
          />
        )}
      </View>
    </ScrollView>
  );
}