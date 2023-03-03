import { StatusBar } from "expo-status-bar"
import { StyleSheet, Text, View, Alert } from "react-native"
import { Button, DataTable, Title, Provider as PaperProvider, Divider } from "react-native-paper"
import React, { FC, useEffect, useRef, useState } from "react"
import useApp from "./useApp"

import {
  checkIfHasSMSPermission,
  requestReadSMSPermission,
  startReadSMS,
} from "@maniac-tech/react-native-expo-read-sms"

export default function App() {
  const [sms, setSms] = useState("")
  const [permissios, setPermissions] = useState(false)

  console.log(sms)

  const successCallbackFn = (status, sms, error) => {
    if (status === "success") {
      if (sms) {
        setSms(sms.slice(1, -1)?.split(",")[1]?.split(":")[1]?.trim())
      }
    } else {
      Alert.alert("Error", error, [
        {
          text: "OK",
        },
      ])
    }
  }

  const errorCallbackFn = (status, sms, error) => {
    Alert.alert("Error", t("ErrorCallbackFn when read sms"), [
      {
        text: "OK",
      },
    ])
  }

  // --------------- read SMS -------------------
  useEffect(() => {
    ;(async () => {
      const hasPermission = await checkIfHasSMSPermission()

      if (hasPermission.hasReadSmsPermission || hasPermission.hasReceiveSmsPermission) {
        startReadSMS(successCallbackFn, errorCallbackFn)
      } else {
        requestReadSMSPermission()
        setPermissions(true)
      }
    })()
  }, [permissios])

  // --------------- read SMS -------------------

  return (
    <PaperProvider>
      <View style={styles.container}>
        <Text>sms</Text>
        <Text>{sms}</Text>
      </View>
    </PaperProvider>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
})
