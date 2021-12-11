import React from "react";
import { ScrollView, Text, View } from "react-native";

import { tailwind } from "tailwind";
import { Button } from "~/components/Button";
import { InputGroup } from "~/components/InputGroup";

import * as Yup from "yup";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

interface CreateAccountProps {}

type FormValues = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
};

export const CreateAccount: React.FunctionComponent<CreateAccountProps> =
  ({}) => {
    const validationSchema = Yup.object({
      firstName: Yup.string().required("Veuillez saisir votre prénom"),
      lastName: Yup.string().required("Veuillez saisir votre nom"),
      email: Yup.string()
        .email("Veuillez saisir une adresse mail valide")
        .required("Veuillez saisir une adresse mail"),
      password: Yup.string()
        .min(6, "Veuillez saisir au moins 6 caractères")
        .required("Veuillez saisir un mot de passe"),
      confirmPassword: Yup.string()
        .required("Veuillez confirmer votre mot de passe")
        .oneOf([Yup.ref("password")], "Les mots de passe ne correspondent pas"),
    }).required();

    const {
      control,
      handleSubmit,
      clearErrors,
      formState: { errors },
    } = useForm<FormValues>({
      mode: "onBlur",
      resolver: yupResolver(validationSchema),
    });

    const signup = () => {
      clearErrors();
      console.log("Create account here...");
    };
    return (
      <ScrollView
        style={tailwind("flex flex-1")}
        contentContainerStyle={tailwind(" p-4 ")}
      >
        <Text style={tailwind("font-bold text-xl mt-2")}>
          Création de compte
        </Text>
        <Controller
          control={control}
          name="firstName"
          render={({
            field: { onChange, value, onBlur },
            fieldState: { error },
          }) => (
            <InputGroup
              label="Prénom"
              value={value}
              placeholder="Marie"
              onBlur={onBlur}
              error={!!error}
              errorDetails={error?.message}
              onChangeText={onChange}
            />
          )}
        />
        <Controller
          control={control}
          name="lastName"
          render={({
            field: { onChange, value, onBlur },
            fieldState: { error },
          }) => (
            <InputGroup
              label="Nom"
              value={value}
              placeholder="Berry"
              onChangeText={onChange}
              onBlur={onBlur}
              error={!!error}
              errorDetails={error?.message}
            />
          )}
        />
        <Controller
          control={control}
          name="email"
          render={({
            field: { onChange, value, onBlur },
            fieldState: { error },
          }) => (
            <InputGroup
              label="Email"
              value={value}
              placeholder="marie.berry@mail.com"
              onChangeText={onChange}
              type="email-address"
              onBlur={onBlur}
              error={!!error}
              errorDetails={error?.message}
            />
          )}
        />
        <Controller
          control={control}
          name="password"
          render={({
            field: { onChange, value, onBlur },
            fieldState: { error },
          }) => (
            <InputGroup
              label="Mot de passe"
              value={value}
              onChangeText={onChange}
              onBlur={onBlur}
              password
              error={!!error}
              errorDetails={error?.message}
            />
          )}
        />
        <Controller
          control={control}
          name="confirmPassword"
          render={({
            field: { onChange, value, onBlur },
            fieldState: { error },
          }) => (
            <InputGroup
              label="Confirmation de mot de passe"
              value={value}
              onChangeText={onChange}
              onBlur={onBlur}
              error={!!error}
              errorDetails={error?.message}
              password
            />
          )}
        />
        <View style={tailwind("flex-grow")} />
        {errors && Object.keys(errors).length > 0 && (
          <Text style={tailwind("text-red-500 mt-5")}>
            Veuillez remplir tous les champs obligatoires
          </Text>
        )}
        <Button onPress={handleSubmit(signup)}>Créer mon compte</Button>
      </ScrollView>
    );
  };
