
export enum StatType {
  ASSET = 'ASSET',
  MENTAL = 'MENTAL',
  FOMO = 'FOMO',
  REGULATION = 'REGULATION'
}

export enum HeroStage {
  ORDINARY_WORLD = "1. 평범한 세상 (월세의 삶)",
  CALL_TO_ADVENTURE = "2. 소명의 부름 (폭등의 소식)",
  REFUSAL_OF_CALL = "3. 소명의 거부 (거품론의 유혹)",
  MENTOR = "4. 스승과의 만남 (은둔 고수의 조언)",
  THRESHOLD = "5. 문턱 넘기 (첫 계약서의 무게)",
  TESTS = "6. 시험과 협력자 (임장 전쟁)",
  APPROACH = "7. 심연의 동굴 (대출 심사의 공포)",
  ORDEAL = "8. 시련 (규제의 파도)",
  REWARD = "9. 보상 (등기권리증의 획득)",
  ROAD_BACK = "10. 귀로 (보유세의 습격)",
  RESURRECTION = "11. 부활 (하락장의 생존)",
  RETURN = "12. 영약과 귀환 (해탈 혹은 성공)"
}

export enum CharacterArchetype {
  MENTOR = "MENTOR",         // 조력자/스승
  ANTAGONIST = "ANTAGONIST", // 적대자/경쟁자
  SHADOW = "SHADOW",         // 유혹자/악당
  HERALD = "HERALD",         // 전령/계기
  GUARDIAN = "GUARDIAN",     // 수호자/관문
  ALLY = "ALLY"              // 동료/친구
}

export interface CardChoice {
  text: string;
  impact: Partial<Record<StatType, number>>;
  feedback: string;
  outcome: string;
}

export interface GameCard {
  id: string;
  character: string;
  archetype: CharacterArchetype;
  image: string;
  dialogue: string;
  leftChoice: CardChoice;
  rightChoice: CardChoice;
}

export interface Stats {
  [StatType.ASSET]: number;
  [StatType.MENTAL]: number;
  [StatType.FOMO]: number;
  [StatType.REGULATION]: number;
}

export interface GameState {
  stats: Stats;
  history: string[];
  currentCard: GameCard | null;
  isGameOver: boolean;
  gameOverReason: string;
  daysSurvived: number;
  currentStage: HeroStage;
}
