
import { GoogleGenAI } from "@google/genai";
import { GameCard, HeroStage, Stats, CharacterArchetype } from "../types.ts";

export function getHeroStage(days: number): HeroStage {
  const stages = Object.values(HeroStage);
  const index = Math.min(stages.length - 1, Math.floor(days / 5));
  return stages[index] as HeroStage;
}

export async function generateNewEvent(history: string[], days: number): Promise<GameCard | null> {
  const ai = new GoogleGenAI({ apiKey: import.meta.env.VITE_GEMINI_API_KEY });
  const stage = getHeroStage(days);

  const storyPrompt = `
    당신은 대한민국 서울 부동산 시장을 배경으로 한 '현대 비극 소설가'입니다.
    플레이어는 현재 '영웅의 여정' [${stage}] 단계에 있습니다.

    서사 지침:
    1. 다음 중 하나의 아키타입(Archetype)을 선정하여 캐릭터를 생성하세요: MENTOR, ANTAGONIST, SHADOW, HERALD, GUARDIAN, ALLY.
    2. 각자의 욕망(돈, 권력, 생존, 안성)이 대사에 드러나게 하세요.
    3. 풍자적 어휘: '영끌', '상급지', '몸테크', '대장아파트', '역전세', '초품아' 등을 사용하세요.

    반드시 아래 JSON 형식으로만 답변하세요:
    {
      "archetype": "선정한 아키타입",
      "character": "이름과 직함",
      "dialogue": "캐릭터의 성격이 묻어나는 대사",
      "visualDescription": "이미지 생성을 위한 캐릭터 외모 묘사",
      "leftChoice": { "text": "선택지", "impact": { "ASSET": 숫자, "MENTAL": 숫자, "FOMO": 숫자, "REGULATION": 숫자 }, "feedback": "리액션", "outcome": "결과" },
      "rightChoice": { "text": "선택지", "impact": { "ASSET": 숫자, "MENTAL": 숫자, "FOMO": 숫자, "REGULATION": 숫자 }, "feedback": "리액션", "outcome": "결과" }
    }
  `;

  try {
    const storyResponse = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: storyPrompt,
      config: { responseMimeType: "application/json" }
    });

    const data = JSON.parse(storyResponse.text || "{}");
    
    // Character Image Generation with fallback
    let imageUrl = `https://picsum.photos/seed/${encodeURIComponent(data.character || 'default')}/400/400`;
    
    try {
      const imagePrompt = `A satirical, high-contrast, bold character portrait for a Korean real estate game. Character: ${data.character}. Appearance: ${data.visualDescription}. Expressive, stylized, flat colors, clean background.`;
      const imageResponse = await ai.models.generateContent({
        model: 'gemini-2.5-flash-image',
        contents: [{ parts: [{ text: imagePrompt }] }]
      });

      if (imageResponse.candidates?.[0]?.content?.parts) {
        for (const part of imageResponse.candidates[0].content.parts) {
          if (part.inlineData) {
            imageUrl = `data:image/png;base64,${part.inlineData.data}`;
            break;
          }
        }
      }
    } catch (imgErr) {
      console.warn("Image generation failed, using fallback:", imgErr);
    }

    return {
      id: Math.random().toString(36).substring(2, 11),
      archetype: (data.archetype || "ALLY") as CharacterArchetype,
      character: data.character || "이름 모를 행인",
      image: imageUrl,
      dialogue: data.dialogue || "서울에서 살아남는 건 정말 쉽지 않네요.",
      leftChoice: data.leftChoice || { text: "글쎄요", impact: {}, feedback: "넘어가기", outcome: "아무 일도 없었습니다." },
      rightChoice: data.rightChoice || { text: "그렇네요", impact: {}, feedback: "동의하기", outcome: "공감이 형성되었습니다." }
    };
  } catch (error) {
    console.error("Gemini generation total failure:", error);
    return null;
  }
}

export async function generateGameOverSummary(stats: Stats, days: number, reason: string): Promise<string> {
  const ai = new GoogleGenAI({ apiKey: import.meta.env.VITE_GEMINI_API_KEY });
  const prompt = `서울 부동산 서바이벌 종료. 생존: ${days}일, 원인: ${reason}. 이 비극을 '부동산 커뮤니티 성지글' 스타일로 짧게 한 문장 작성하세요.`;
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: prompt,
    });
    return response.text || "서울의 콘크리트 숲 아래 당신의 이름은 잊혀졌습니다.";
  } catch (error) {
    return "다음 생엔 청약 당첨되시길 바랍니다.";
  }
}
