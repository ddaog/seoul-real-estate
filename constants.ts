
import { GameCard, StatType, CharacterArchetype, HeroStage } from './types.ts';

export const INITIAL_STATS = {
  [StatType.ASSET]: 50,
  [StatType.MENTAL]: 50,
  [StatType.FOMO]: 30,
  [StatType.HEALTH]: 80, // Start with good health
};

export const PRESET_CARDS: GameCard[] = [
  // Stage 1: 평범한 세상 (DAY 0-4)
  {
    id: 'ordinary-1',
    character: '회사 동료 김대리',
    archetype: CharacterArchetype.ALLY,
    stages: [HeroStage.ORDINARY_WORLD],
    image: 'https://picsum.photos/seed/friendly_colleague_kim/400/400',
    dialogue: "야, 너만 빼고 동기들 다 상급지 등기 쳤다. 잠실리 급매 잡았다는데 넌 평생 월세만 낼 거야?",
    leftChoice: {
      text: "난 소신껏 살래",
      impact: { [StatType.MENTAL]: -10, [StatType.FOMO]: -5, [StatType.ASSET]: 5 },
      feedback: "벼락거지 예고",
      outcome: "소신은 지켰지만 단톡방 수익 자랑에 소화제가 필수템이 됐습니다."
    },
    rightChoice: {
      text: "나도 알아볼래!",
      impact: { [StatType.FOMO]: 20, [StatType.MENTAL]: -5, [StatType.ASSET]: -5 },
      feedback: "FOMO 발화",
      outcome: "그날부터 유튜브 대신 호갱노노를 켜고 잠을 잃었습니다."
    }
  },
  {
    id: 'ordinary-2',
    character: '어머니',
    archetype: CharacterArchetype.GUARDIAN,
    stages: [HeroStage.ORDINARY_WORLD],
    image: 'https://picsum.photos/seed/worried_mom/400/400',
    dialogue: "얘야, 이제 결혼도 생각해야지. 집 없으면 소개도 안 들어온대. 전세금 빼서 도와줄까?",
    leftChoice: {
      text: "제가 화이팅할게요",
      impact: { [StatType.MENTAL]: 10, [StatType.FOMO]: 5, [StatType.ASSET]: 0 },
      feedback: "효자 모드",
      outcome: "부모님 걱정은 덜었지만 SNS 집들이가 가슴을 긁습니다."
    },
    rightChoice: {
      text: "도와주세요...",
      impact: { [StatType.ASSET]: 15, [StatType.MENTAL]: -10, [StatType.HEALTH]: -5 },
      feedback: "가족 차입",
      outcome: "부모님 전세금으로 한강뷰를 결제했습니다. 이제 물러설 길이 없습니다."
    }
  },
  {
    id: 'ordinary-3',
    character: '월세 집주인',
    archetype: CharacterArchetype.HERALD,
    stages: [HeroStage.ORDINARY_WORLD],
    image: 'https://picsum.photos/seed/landlord/400/400',
    dialogue: "다음 달부터 월세 10만 올립니다. 시세가 다 올랐어요. 싫으면 나가셔도 됩니다.",
    leftChoice: {
      text: "알겠습니다...",
      impact: { [StatType.ASSET]: -10, [StatType.MENTAL]: -15, [StatType.FOMO]: 10 },
      feedback: "월세 노예",
      outcome: "매달 빠져나가는 돈을 보며 내 집 마련 네 글자가 뇌리에 박힙니다."
    },
    rightChoice: {
      text: "이사 갈래요!",
      impact: { [StatType.MENTAL]: 5, [StatType.ASSET]: -5, [StatType.FOMO]: 15 },
      feedback: "탈출 시도",
      outcome: "이사짐을 싸며 깨닫습니다. 서울은 어디든 비슷하다는 걸요."
    }
  },

  // Stage 2: 소명의 부름 (DAY 5-9)
  {
    id: 'call-1',
    character: '부동산 유튜버',
    archetype: CharacterArchetype.HERALD,
    stages: [HeroStage.CALL_TO_ADVENTURE],
    image: 'https://picsum.photos/seed/youtube_realtor/400/400',
    dialogue: "여러분 지금이 마지막 기회입니다. 3기 신도시 발표 나면 이 가격 다시 못 봅니다.",
    leftChoice: {
      text: "광고 스킵",
      impact: { [StatType.FOMO]: -5, [StatType.MENTAL]: 5, [StatType.HEALTH]: 5 },
      feedback: "광고 스킵",
      outcome: "영상을 끄고도 새벽에 3기 신도시 검색창을 열었습니다."
    },
    rightChoice: {
      text: "풀영상 시청",
      impact: { [StatType.FOMO]: 25, [StatType.MENTAL]: -10, [StatType.ASSET]: -5 },
      feedback: "FOMO 가속",
      outcome: "구독과 알림을 켰습니다. 알고리즘은 당신을 호갱으로 분류했습니다."
    }
  },
  {
    id: 'call-2',
    character: '은행 대출 상담사',
    archetype: CharacterArchetype.GUARDIAN,
    stages: [HeroStage.CALL_TO_ADVENTURE],
    image: 'https://picsum.photos/seed/bank_consultant/400/400',
    dialogue: "DSR 규제 전에 최대한 받으세요. 지금 아니면 나중에 못 받습니다. LTV 70% 가능합니다.",
    leftChoice: {
      text: "생각 좀 해볼게요",
      impact: { [StatType.HEALTH]: 5, [StatType.MENTAL]: 5, [StatType.ASSET]: 0 },
      feedback: "신중한 선택",
      outcome: "일주일 뒤 규제가 강화돼 LTV가 반 토막 났습니다."
    },
    rightChoice: {
      text: "풀대출 실행!",
      impact: { [StatType.ASSET]: 20, [StatType.HEALTH]: -10, [StatType.MENTAL]: -15 },
      feedback: "영끌 시작",
      outcome: "대출 한도는 나왔고 남은 건 용기뿐입니다."
    }
  },

  // Stage 3: 소명의 거부 (DAY 10-14)
  {
    id: 'refusal-1',
    character: '경제학과 교수',
    archetype: CharacterArchetype.MENTOR,
    stages: [HeroStage.REFUSAL_OF_CALL],
    image: 'https://picsum.photos/seed/economics_professor/400/400',
    dialogue: "이건 명백한 거품입니다. 이런 상승은 항상 폭락으로 끝났습니다. 기다리세요.",
    leftChoice: {
      text: "옳으신 말씀",
      impact: { [StatType.FOMO]: -15, [StatType.MENTAL]: 10, [StatType.HEALTH]: 5 },
      feedback: "거품론 수용",
      outcome: "이성적 판단을 했지만 집값은 또 20% 올랐습니다."
    },
    rightChoice: {
      text: "교수님이 뭘 알아요!",
      impact: { [StatType.FOMO]: 20, [StatType.MENTAL]: -10, [StatType.ASSET]: -5 },
      feedback: "이번엔 다름",
      outcome: "이번엔 다르다는 말이 모든 거품의 시작이었습니다."
    }
  },
  {
    id: 'refusal-2',
    character: '배우자',
    archetype: CharacterArchetype.ALLY,
    stages: [HeroStage.REFUSAL_OF_CALL],
    image: 'https://picsum.photos/seed/worried_spouse/400/400',
    dialogue: "여보, 빚내서 집 사야 해? 그냥 전세로 살면 안 될까?",
    leftChoice: {
      text: "안전하게 가자",
      impact: { [StatType.MENTAL]: 15, [StatType.FOMO]: -20, [StatType.ASSET]: 5 },
      feedback: "안정 추구",
      outcome: "평화를 택했지만 전셋값은 멈출 줄을 몰랐습니다."
    },
    rightChoice: {
      text: "지금 아님 평생 못사",
      impact: { [StatType.MENTAL]: -20, [StatType.FOMO]: 15, [StatType.HEALTH]: -10 },
      feedback: "관계 균열",
      outcome: "말수는 줄고 공기는 차가워졌습니다."
    }
  },

  // Stage 4: 스승과의 만남 (DAY 15-19)
  {
    id: 'mentor-1',
    character: '은둔 고수 재테크 블로거',
    archetype: CharacterArchetype.MENTOR,
    stages: [HeroStage.MENTOR],
    image: 'https://picsum.photos/seed/finance_guru/400/400',
    dialogue: "핵심은 현금흐름입니다. 갭투자로 월세 받고 시세차익도 챙기세요. 나는 10채를 모았습니다.",
    leftChoice: {
      text: "1채만 할게요",
      impact: { [StatType.ASSET]: -15, [StatType.HEALTH]: -5, [StatType.MENTAL]: -5 },
      feedback: "보수적 접근",
      outcome: "첫 갭투자는 성공. 월세 50만원, 이자 60만원이 찍혔습니다."
    },
    rightChoice: {
      text: "저도 10채 도전!",
      impact: { [StatType.ASSET]: -30, [StatType.FOMO]: 30, [StatType.HEALTH]: -20 },
      feedback: "빚투 선언",
      outcome: "영혼까지 끌어모아 2채 계약. 이제 다주택자입니다."
    }
  },
  {
    id: 'mentor-2',
    character: '노련한 공인중개사',
    archetype: CharacterArchetype.MENTOR,
    stages: [HeroStage.MENTOR],
    image: 'https://picsum.photos/seed/experienced_broker/400/400',
    dialogue: "역에서 10분, 학군 좋고 재건축 기대. 이런 물건은 10년에 한 번 나옵니다. 프리미엄 3천입니다.",
    leftChoice: {
      text: "너무 비싸요",
      impact: { [StatType.ASSET]: 5, [StatType.FOMO]: -10, [StatType.MENTAL]: 5 },
      feedback: "협상 실패",
      outcome: "깎아달라 했더니 중개사는 다른 손님에게 전화했습니다."
    },
    rightChoice: {
      text: "입금할게요!",
      impact: { [StatType.ASSET]: -25, [StatType.HEALTH]: -5, [StatType.FOMO]: 10 },
      feedback: "웃돈 결제",
      outcome: "합법적으로 신고할 수 없는 돈이 오갔습니다. 공범이 되었습니다.",
      gameOverReason: "[사기 피해 엔딩] 기획부동산에 당해 남은 전세금까지 탈탈 털렸습니다."
    }
  },

  // Stage 5: 문턱 넘기 (DAY 20-24)
  {
    id: 'threshold-1',
    character: '법무사',
    archetype: CharacterArchetype.GUARDIAN,
    stages: [HeroStage.THRESHOLD],
    image: 'https://picsum.photos/seed/lawyer_notary/400/400',
    dialogue: "도장 찍기 전 마지막 확인입니다. 정말 괜찮으시겠습니까?",
    leftChoice: {
      text: "잠시만요...",
      impact: { [StatType.MENTAL]: 10, [StatType.FOMO]: -15, [StatType.HEALTH]: 5 },
      feedback: "마지막 망설임",
      outcome: "사무실을 나섰고 그날 밤 다른 사람이 계약했다는 문자를 받았습니다."
    },
    rightChoice: {
      text: "찍습니다!",
      impact: { [StatType.ASSET]: -35, [StatType.HEALTH]: -10, [StatType.MENTAL]: -20 },
      feedback: "운명의 낙인",
      outcome: "도장이 내려앉는 순간 세상이 내 것 같았고 통장은 마이너스가 됐습니다."
    }
  },
  {
    id: 'threshold-2',
    character: '첫 등기부등본',
    archetype: CharacterArchetype.HERALD,
    stages: [HeroStage.THRESHOLD],
    image: 'https://picsum.photos/seed/property_deed/400/400',
    dialogue: "축하합니다. 서울시 XX구 XX동 XXX-X 소유자가 되셨습니다. 근저당 2억.",
    leftChoice: {
      text: "인스타 업로드!",
      impact: { [StatType.FOMO]: 10, [StatType.MENTAL]: 10, [StatType.HEALTH]: -5 },
      feedback: "자랑의 순간",
      outcome: "좋아요는 쌓였지만 댓글은 부럽다와 영끌이냐로 갈렸습니다."
    },
    rightChoice: {
      text: "조용히 보관",
      impact: { [StatType.MENTAL]: 5, [StatType.FOMO]: -5, [StatType.ASSET]: 5 },
      feedback: "과묵한 승리",
      outcome: "아무에게도 말하지 않았지만 매일 밤 등기부를 꺼내봅니다."
    }
  },

  // Stage 6: 시험과 협력자 (DAY 25-29)
  {
    id: 'test-1',
    character: '부동산 카페 회원',
    archetype: CharacterArchetype.ALLY,
    stages: [HeroStage.TESTS],
    image: 'https://picsum.photos/seed/cafe_member/400/400',
    dialogue: "형님 이번 주말 임장 같이 가실래요? 저는 분당, 형님은 어디 봐요?",
    leftChoice: {
      text: "혼자 다닐게요",
      impact: { [StatType.MENTAL]: 5, [StatType.FOMO]: -5, [StatType.ASSET]: 0 },
      feedback: "고독한 투자",
      outcome: "혼자 판단했지만 급매 정보는 남들이 먼저 챙겼습니다."
    },
    rightChoice: {
      text: "같이가요!",
      impact: { [StatType.HEALTH]: -15, [StatType.FOMO]: 15, [StatType.MENTAL]: -5 },
      feedback: "정보력 상승",
      outcome: "주말은 모두 현장입니다. 체력은 다음 생에 챙깁니다."
    }
  },
  {
    id: 'test-2',
    character: '세입자',
    archetype: CharacterArchetype.SHADOW,
    stages: [HeroStage.TESTS],
    image: 'https://picsum.photos/seed/difficult_tenant/400/400',
    dialogue: "집주인님, 이번 달 월세 좀 늦춰도 될까요? 다음 달엔 꼭 드릴게요.",
    leftChoice: {
      text: "천천히 주세요",
      impact: { [StatType.ASSET]: -10, [StatType.MENTAL]: 10, [StatType.HEALTH]: 5 },
      feedback: "착한 집주인",
      outcome: "인간미는 보였지만 대출 이자는 기다려주지 않았습니다."
    },
    rightChoice: {
      text: "칼같이 주세요",
      impact: { [StatType.ASSET]: 5, [StatType.MENTAL]: -15, [StatType.HEALTH]: -5 },
      feedback: "냉정한 투자자",
      outcome: "비즈니스는 비즈니스. 그날 밤 당신도 한때 세입자였음을 떠올립니다."
    }
  },

  // Stage 7: 심연의 동굴 (DAY 30-34)
  {
    id: 'approach-1',
    character: '금융당국 발표',
    archetype: CharacterArchetype.HERALD,
    stages: [HeroStage.APPROACH],
    image: 'https://picsum.photos/seed/government_announcement/400/400',
    dialogue: "속보. 정부, DSR 40% 강화 및 다주택 대출 전면 금지. 내일 0시 시행.",
    leftChoice: {
      text: "알봐 아님",
      impact: { [StatType.HEALTH]: 5, [StatType.MENTAL]: -5, [StatType.ASSET]: 0 },
      feedback: "방관자",
      outcome: "뉴스를 끊었지만 다음날 시장이 얼어붙었습니다."
    },
    rightChoice: {
      text: "추가 대출!",
      impact: { [StatType.ASSET]: 15, [StatType.HEALTH]: -20, [StatType.MENTAL]: -20 },
      feedback: "마지막 영끌",
      outcome: "자정 전까지 대출 신청을 돌렸고 빚만 두 배가 됐습니다."
    }
  },
  {
    id: 'approach-2',
    character: '세무사',
    archetype: CharacterArchetype.GUARDIAN,
    stages: [HeroStage.APPROACH],
    image: 'https://picsum.photos/seed/tax_accountant/400/400',
    dialogue: "종부세 폭탄 예상됩니다. 법인 전환하거나 한 채 정리하세요. 아니면...",
    leftChoice: {
      text: "낼게요...",
      impact: { [StatType.ASSET]: -20, [StatType.MENTAL]: -10, [StatType.HEALTH]: -5 },
      feedback: "정직한 납세",
      outcome: "3천만원 고지서가 도착했습니다. 보너스가 통째로 사라졌습니다.",
      gameOverReason: "[적자 엔딩] 징벌적 과세와 규제로 숨만 쉬어도 적자입니다."
    },
    rightChoice: {
      text: "법인 전환!",
      impact: { [StatType.HEALTH]: -15, [StatType.ASSET]: -10, [StatType.MENTAL]: -15 },
      feedback: "절세 전략",
      outcome: "법인을 만들었습니다. 대표이사님이 되셨습니다. 직원은 없습니다."
    }
  },

  // Stage 8: 시련 (DAY 35-39)
  {
    id: 'ordeal-1',
    character: '뉴스 속보',
    archetype: CharacterArchetype.HERALD,
    stages: [HeroStage.ORDEAL],
    image: 'https://picsum.photos/seed/breaking_news/400/400',
    dialogue: "단독. 서울 아파트 3개월 연속 하락. 전문가들 조정 아닌 폭락 경고.",
    leftChoice: {
      text: "존버만이 살길",
      impact: { [StatType.MENTAL]: 5, [StatType.FOMO]: -10, [StatType.ASSET]: -10 },
      feedback: "흔들림 없음",
      outcome: "시세 확인을 끊었지만 손가락은 매일 앱을 눌렀습니다."
    },
    rightChoice: {
      text: "지금이라도 팔자",
      impact: { [StatType.MENTAL]: -20, [StatType.FOMO]: 10, [StatType.HEALTH]: -10 },
      feedback: "공포의 시작",
      outcome: "매도 호가를 올렸지만 3개월째 연락은 없습니다."
    }
  },
  {
    id: 'ordeal-2',
    character: '대출 은행 담당자',
    archetype: CharacterArchetype.SHADOW,
    stages: [HeroStage.ORDEAL],
    image: 'https://picsum.photos/seed/bank_officer/400/400',
    dialogue: "담보가치 재평가로 LTV 80% 초과. 2주 내 5천만원 상환 요청드립니다.",
    leftChoice: {
      text: "집 내놓겠습니다",
      impact: { [StatType.ASSET]: -40, [StatType.MENTAL]: -25, [StatType.HEALTH]: -15 },
      feedback: "강제 정리",
      outcome: "급매로 내놔 2억 손해. 다시 월세 생활로 복귀합니다."
    },
    rightChoice: {
      text: "엄마 도와줘!",
      impact: { [StatType.ASSET]: 15, [StatType.MENTAL]: -30, [StatType.HEALTH]: -10 },
      feedback: "가족의 희생",
      outcome: "부모님 노후 자금으로 빚을 막았습니다. 명절이 괴로워집니다."
    }
  },

  // Stage 9: 보상 (DAY 40-44)
  {
    id: 'reward-1',
    character: '재개발 조합 이사',
    archetype: CharacterArchetype.HERALD,
    stages: [HeroStage.REWARD],
    image: 'https://picsum.photos/seed/redevelopment_union/400/400',
    dialogue: "재개발 통과. 시세 3배 기대됩니다. 조합비 2천만 추가입니다.",
    leftChoice: {
      text: "가즈아!",
      impact: { [StatType.ASSET]: 40, [StatType.MENTAL]: 20, [StatType.FOMO]: 10 },
      feedback: "대박의 순간",
      outcome: "5년 기다림 끝에 빚을 갚고 현금을 쥐었습니다."
    },
    rightChoice: {
      text: "지금 팔래",
      impact: { [StatType.ASSET]: 25, [StatType.MENTAL]: 10, [StatType.HEALTH]: 5 },
      feedback: "안전한 차익",
      outcome: "프리미엄 매도로 탈출. 1년 뒤 사업이 무산됐습니다."
    }
  },

  // Stage 10: 귀로 (DAY 45-49)
  {
    id: 'road-back-1',
    character: '국세청 등기우편',
    archetype: CharacterArchetype.SHADOW,
    stages: [HeroStage.ROAD_BACK],
    image: 'https://picsum.photos/seed/tax_mail/400/400',
    dialogue: "자금출처조사 소명 안내문입니다. 3년 전 거래의 자금 흐름이 불투명합니다.",
    leftChoice: {
      text: "세무사 선임",
      impact: { [StatType.ASSET]: -15, [StatType.HEALTH]: -10, [StatType.MENTAL]: -5 },
      feedback: "전문가의 조력",
      outcome: "수임료 1500만원을 내고 간신히 무마했습니다."
    },
    rightChoice: {
      text: "직접 싸운다",
      impact: { [StatType.MENTAL]: -25, [StatType.ASSET]: -5, [StatType.FOMO]: 5 },
      feedback: "맨땅에 헤딩",
      outcome: "3달 싸워 500만원 추징으로 끝냈지만 흰머리가 늘었습니다."
    }
  },

  // Stage 11: 부활 (DAY 50-54)
  {
    id: 'resurrection-1',
    character: '부동산 폭락장',
    archetype: CharacterArchetype.SHADOW,
    stages: [HeroStage.RESURRECTION],
    image: 'https://picsum.photos/seed/market_crash/400/400',
    dialogue: "금리 8%, 서울 집값 40% 폭락. 모두가 던지는 날, 당신의 선택은?",
    leftChoice: {
      text: "지금이 기회다",
      impact: { [StatType.ASSET]: -20, [StatType.FOMO]: -20, [StatType.MENTAL]: -20 },
      feedback: "용기 있는 베팅",
      outcome: "모두가 미쳤다 했지만 당신은 기회라고 믿었습니다."
    },
    rightChoice: {
      text: "현금 챙겨!",
      impact: { [StatType.ASSET]: -10, [StatType.MENTAL]: 10, [StatType.HEALTH]: 5 },
      feedback: "안전제일",
      outcome: "살아남는 게 전부입니다. 쓰나미가 지나가길 기다립니다."
    }
  },

  // Stage 12: 영약과 귀환 (DAY 55+)
  {
    id: 'return-1',
    character: '10년 후의 당신',
    archetype: CharacterArchetype.MENTOR,
    stages: [HeroStage.RETURN],
    image: 'https://picsum.photos/seed/future_self/400/400',
    dialogue: "돌이켜보니 그 선택들이 나를 만들었어. 후회는 글쎄, 해봤자 의미 없지.",
    leftChoice: {
      text: "건물주 되기",
      impact: { [StatType.ASSET]: 10, [StatType.MENTAL]: 5, [StatType.HEALTH]: 10 },
      feedback: "세습의 길",
      outcome: "자녀에게 집 3채를 남겼습니다. 고통은 물려주지 않길 바라며."
    },
    rightChoice: {
      text: "노하우 공유",
      impact: { [StatType.MENTAL]: 20, [StatType.FOMO]: -20, [StatType.ASSET]: 0 },
      feedback: "지혜의 전수",
      outcome: "블로그를 열었습니다. 제목은 서울에서 살아남는 법."
    }
  }
];
