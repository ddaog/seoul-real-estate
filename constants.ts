
import { GameCard, StatType, CharacterArchetype } from './types.ts';

export const INITIAL_STATS = {
  [StatType.ASSET]: 50,
  [StatType.MENTAL]: 50,
  [StatType.FOMO]: 30,
  [StatType.REGULATION]: 40,
};

export const PRESET_CARDS: GameCard[] = [
  {
    id: 'start-1',
    character: '회사 동료 김대리',
    archetype: CharacterArchetype.ALLY,
    image: 'https://picsum.photos/seed/friendly_colleague_kim/400/400',
    dialogue: `"야, 너만 빼고 동기들 다 '상급지' 갈아탔어. 어제도 누구는 잠실리(Jam-sil-ly) 급매 잡았다던데, 넌 평생 월세만 낼 거야?"`,
    leftChoice: {
      text: "난 소신껏 살래.",
      impact: { [StatType.MENTAL]: -10, [StatType.FOMO]: -5, [StatType.ASSET]: 5 },
      feedback: "벼락거지 확정?",
      outcome: "소신은 지켰지만, 점심시간마다 들려오는 동료들의 주식과 부동산 자랑에 마음 한구석이 서늘해집니다."
    },
    rightChoice: {
      text: "나도 알아봐야겠어!",
      impact: { [StatType.FOMO]: 20, [StatType.MENTAL]: -5, [StatType.ASSET]: -5 },
      feedback: "영끌의 서막",
      outcome: "그날 밤부터 당신은 퇴근 후 유튜브 대신 호갱노노를 켜게 되었습니다. 이제 평범한 일상은 끝났습니다."
    }
  },
  {
    id: 'start-2',
    character: '투기 전설 박부장',
    archetype: CharacterArchetype.ANTAGONIST,
    image: 'https://picsum.photos/seed/greedy_investor_park/400/400',
    dialogue: `"부동산은 타이밍이야. 규제 들어오기 전에 지금 당장 마푸(Ma-pu) 갭투자 들어가야 해. 내가 아는 복덕방 사장이 물건 하나 빼놨어."`,
    leftChoice: {
      text: "너무 위험해 보여요.",
      impact: { [StatType.MENTAL]: 10, [StatType.ASSET]: 0, [StatType.FOMO]: -10 },
      feedback: "기회를 날렸나?",
      outcome: "박부장은 혀를 차며 떠나갔습니다. 하지만 한 달 뒤 그 물건의 호가가 1억이 올랐다는 소문을 듣게 됩니다."
    },
    rightChoice: {
      text: "계약서 보내주세요!",
      impact: { [StatType.ASSET]: -30, [StatType.FOMO]: 15, [StatType.REGULATION]: 10 },
      feedback: "자산가의 길?",
      outcome: "계약서에 도장을 찍는 순간, 서울 하늘이 내 것처럼 보입니다. 물론 당신의 계좌 잔고는 0원을 향해 달려갑니다."
    }
  }
];
