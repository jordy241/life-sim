import React, { useMemo, useState } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";

import { Dialog } from "@/components/ui/dialog";
import { PillButton } from "@/components/ui/pill-button";
import { JOB_ROLES } from "@/game/data/jobs";
import { useGameStore } from "@/game/state/game-store";
import { useTheme, type Theme } from "@/theme/ThemeProvider";

type Job = (typeof JOB_ROLES)[number];

export default function JobsScreen() {
  const { theme } = useTheme();
  const styles = useMemo(() => createStyles(theme), [theme]);

  const setJob = useGameStore((s) => s.actions.setJob);
  const currentJobRoleId = useGameStore(
    (s) => s.state.progress.player.jobRoleId
  );

  const [selectedJob, setSelectedJob] = useState<Job | null>(null);

  const formatPay = (job: Job) => {
    const amount = job.weeklyPay.amount.toLocaleString("nl-BE");
    return `${amount} ${job.weeklyPay.currency} / week`;
  };

  return (
    <View style={styles.root}>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.title}>Jobs</Text>

        {JOB_ROLES.map((job) => {
          const isCurrent = currentJobRoleId === job.id;

          return (
            <PillButton
              key={job.id}
              title={job.title}
              subtitle={isCurrent ? "Current job" : formatPay(job)}
              nextArrow
              left={<Text style={styles.leftIcon}>{job.icon ?? "🧩"}</Text>}
              onPress={() => setSelectedJob(job)}
            />
          );
        })}
      </ScrollView>

      <Dialog visible={!!selectedJob} onClose={() => setSelectedJob(null)}>
        {!selectedJob ? null : (
          <>
            <View style={styles.dialogHeader}>
              <Text style={styles.dialogIcon}>{selectedJob.icon ?? "🧩"}</Text>
              <Text style={styles.dialogTitle}>{selectedJob.title}</Text>
            </View>

            <Text style={styles.dialogDesc}>{selectedJob.description}</Text>

            <View style={styles.metaBlock}>
              <Text style={styles.metaLine}>
                <Text style={styles.metaLabel}>Pay: </Text>
                {formatPay(selectedJob)}
              </Text>

              <Text style={styles.metaLine}>
                <Text style={styles.metaLabel}>Type: </Text>
                {selectedJob.type}
              </Text>

              <Text style={styles.metaLine}>
                <Text style={styles.metaLabel}>Level: </Text>
                {selectedJob.level}
              </Text>

              <Text style={styles.metaLine}>
                <Text style={styles.metaLabel}>Schedule: </Text>
                {selectedJob.schedule}
              </Text>
            </View>

            <View style={{ height: theme.spacing.md }} />

            {/* Bottom actions */}
            <PillButton
              title="Apply now"
              subtitle="Start this job"
              left={<Text style={styles.leftIcon}>✅</Text>}
              onPress={() => {
                setJob(selectedJob.id);
                setSelectedJob(null);
              }}
            />

            <PillButton
              title="Nevermind"
              subtitle="Close"
              left={<Text style={styles.leftIcon}>↩️</Text>}
              onPress={() => setSelectedJob(null)}
            />
          </>
        )}
      </Dialog>
    </View>
  );
}

function createStyles(theme: Theme) {
  return StyleSheet.create({
    root: { flex: 1, backgroundColor: theme.colors.background },
    container: { padding: theme.spacing.md, gap: theme.spacing.sm },
    title: {
      fontSize: 28,
      fontWeight: "700",
      color: theme.colors.text,
      marginBottom: theme.spacing.lg,
    },
    leftIcon: { fontSize: 16 },

    dialogHeader: {
      flexDirection: "row",
      alignItems: "center",
      gap: theme.spacing.sm,
      marginBottom: theme.spacing.sm,
    },
    dialogIcon: { fontSize: 22 },
    dialogTitle: { fontSize: 18, fontWeight: "700", color: theme.colors.text },

    dialogDesc: {
      fontSize: 14,
      color: theme.colors.textMuted,
      marginBottom: theme.spacing.md,
    },

    metaBlock: {
      borderWidth: 1,
      borderColor: theme.colors.border,
      backgroundColor: theme.colors.surface,
      borderRadius: theme.radius.card,
      padding: theme.spacing.md,
      gap: 6,
    },
    metaLine: { color: theme.colors.text, fontSize: 14 },
    metaLabel: { fontWeight: "700" },
  });
}
