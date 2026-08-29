"use client";
import { useRouter, useSearchParams } from "next/navigation";
import { useState, useCallback } from "react";
import { createMatch, joinMatch } from "@/services/match";
import { useAuth } from "@/components/providers/auth-provider";
import Button from "@/components/ui/Button";
import BackButton from "@/components/ui/BackButton";
import PageShell from "@/components/ui/PageShell";
import styles from "./page.module.css";

const Match = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { data } = useAuth();
  const [code, setCode] = useState("");
  const [joinCode, setJoinCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const createdMatchId = searchParams.get("match");

  const handleCreate = useCallback(async () => {
    setLoading(true);
    setError("");
    try {
      const { code: newCode, match } = await createMatch();
      setCode(newCode);
      setJoinCode(newCode);
    } catch (e) {
      setError("No se pudo crear la partida. Intentá de nuevo.");
    } finally {
      setLoading(false);
    }
  }, []);

  const handleJoin = useCallback(async () => {
    const trimmed = joinCode.trim();
    if (!trimmed) {
      setError("Ingresá un código de partida.");
      return;
    }
    setLoading(true);
    setError("");
    try {
      const match = await joinMatch(trimmed);
      router.push(`/game?match=${match.id}`);
    } catch (e) {
      setError("Código inválido o partida ya comenzó.");
    } finally {
      setLoading(false);
    }
  }, [joinCode, router]);

  const handleGoToGame = useCallback(() => {
    if (createdMatchId) {
      router.push(`/game?match=${createdMatchId}`);
    }
  }, [createdMatchId, router]);

  const handleCopyCode = useCallback(async () => {
    if (!code) return;
    try {
      await navigator.clipboard.writeText(code);
    } catch {
      // fallback noop
    }
  }, [code]);

  return (
    <>
      <BackButton onClick={() => router.push("/dashboard")} />
      <PageShell className={styles.shell}>
        <h1 className={styles.title}>Multijugador</h1>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Crear partida</h2>
          <Button fullWidth loading={loading} disabled={loading} onClick={handleCreate}>
            Crear partida
          </Button>
          {code && (
            <div className={styles.codeBox}>
              <span className={styles.codeLabel}>Código de partida</span>
              <div className={styles.codeRow}>
                <span className={styles.codeValue}>{code}</span>
                <Button variant="ghost" size="sm" onClick={handleCopyCode}>
                  Copiar
                </Button>
              </div>
              <Button fullWidth onClick={handleGoToGame}>
                Entrar al juego
              </Button>
            </div>
          )}
        </section>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Unirse a una partida</h2>
          <div className={styles.inputRow}>
            <input
              className={styles.input}
              value={joinCode}
              onChange={(e) => setJoinCode(e.target.value.toUpperCase())}
              placeholder="Ingresá el código"
              maxLength={6}
            />
            <Button
              loading={loading}
              disabled={loading}
              onClick={handleJoin}
            >
              Unirse
            </Button>
          </div>
        </section>

        {error && <div className={styles.error}>{error}</div>}
      </PageShell>
    </>
  );
};

export default Match;
