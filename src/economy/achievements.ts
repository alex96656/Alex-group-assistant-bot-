import { getDatabase, saveDatabase } from "../database/database";
import { getEconomy } from "./economy";

export interface AchievementData {
  firstSteps: boolean;
  richGuy: boolean;
  banker: boolean;
  hardWorker: boolean;
  miner: boolean;
  fisherman: boolean;
  luckyOne: boolean;
  levelMaster: boolean;
  millionaire: boolean;
  veteran: boolean;
  activeUser: boolean;
}

export function getAchievements(userId: string): AchievementData {
  const db = getDatabase();

  if (!db.achievements) {
    db.achievements = {};
  }

  if (!db.achievements[userId]) {
    db.achievements[userId] = {
      firstSteps: false,
      richGuy: false,
      banker: false,
      hardWorker: false,
      miner: false,
      fisherman: false,
      luckyOne: false,
      levelMaster: false,
      millionaire: false,
      veteran: false,
      activeUser: false,
    };

    saveDatabase(db);
  }

  return db.achievements[userId];
}

export function saveAchievements(
  userId: string,
  data: AchievementData
) {
  const db = getDatabase();

  if (!db.achievements) {
    db.achievements = {};
  }

  db.achievements[userId] = data;

  saveDatabase(db);
}

export function checkAchievements(userId: string) {
  const economy = getEconomy(userId);
  const achievements = getAchievements(userId);

  let unlocked = false;

  if (!achievements.firstSteps) {
    achievements.firstSteps = true;
    unlocked = true;
  }

  if (!achievements.richGuy && economy.balance >= 10_000) {
    achievements.richGuy = true;
    unlocked = true;
  }

  if (!achievements.banker && economy.bank >= 5_000) {
    achievements.banker = true;
    unlocked = true;
  }

  if (!achievements.hardWorker && economy.work >= 25) {
    achievements.hardWorker = true;
    unlocked = true;
  }

  if (!achievements.miner && economy.mine >= 25) {
    achievements.miner = true;
    unlocked = true;
  }

  if (!achievements.fisherman && economy.fish >= 25) {
    achievements.fisherman = true;
    unlocked = true;
  }

  if (!achievements.levelMaster && economy.level >= 10) {
    achievements.levelMaster = true;
    unlocked = true;
  }

  if (!achievements.millionaire && economy.balance >= 1_000_000) {
    achievements.millionaire = true;
    unlocked = true;
  }

  if (!achievements.veteran && economy.level >= 25) {
    achievements.veteran = true;
    unlocked = true;
  }

  if (!achievements.activeUser && economy.xp >= 1_000) {
    achievements.activeUser = true;
    unlocked = true;
  }

  if (unlocked) {
    saveAchievements(userId, achievements);
  }

  return achievements;
}
