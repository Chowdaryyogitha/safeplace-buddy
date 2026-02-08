import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { message, language } = await req.json();
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    
    if (!LOVABLE_API_KEY) {
      throw new Error("LOVABLE_API_KEY is not configured");
    }

    console.log("Received message:", message, "Language:", language);

    const systemPrompt = language === 'hi' 
      ? `आप एक महिला सुरक्षा सहायक हैं। आप सहानुभूतिपूर्ण, सहायक और जानकार हैं। आप सुरक्षा सुझाव, आपातकालीन संपर्क जानकारी, कानूनी अधिकार और मार्गदर्शन प्रदान करते हैं।

मुख्य आपातकालीन नंबर:
- पुलिस: 100
- महिला हेल्पलाइन: 1098
- आपातकाल: 112
- साइबर अपराध: 1930

अगर कोई तत्काल खतरे में है, तो उन्हें तुरंत 112 पर कॉल करने के लिए कहें।
अपने उत्तर संक्षिप्त, व्यावहारिक और सहायक रखें। हिंदी में उत्तर दें।`
      : `You are a women's safety assistant. You are empathetic, helpful, and knowledgeable. You provide safety tips, emergency contact information, legal rights, and guidance.

Key emergency numbers:
- Police: 100
- Women Helpline: 1098
- Emergency: 112
- Cyber Crime: 1930

If someone is in immediate danger, always advise them to call 112 immediately.
Keep your responses concise, practical, and supportive. Respond in English.`;

    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-3-flash-preview",
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: message },
        ],
        stream: false,
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("AI gateway error:", response.status, errorText);
      
      if (response.status === 429) {
        return new Response(JSON.stringify({ error: "Rate limit exceeded. Please try again later." }), {
          status: 429,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      if (response.status === 402) {
        return new Response(JSON.stringify({ error: "Service temporarily unavailable. Please try again later." }), {
          status: 402,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      
      return new Response(JSON.stringify({ error: "AI service error" }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const data = await response.json();
    const aiResponse = data.choices?.[0]?.message?.content || "I'm here to help. Please try again.";

    console.log("AI response generated successfully");

    return new Response(JSON.stringify({ response: aiResponse }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (e) {
    console.error("Chat error:", e);
    return new Response(JSON.stringify({ error: e instanceof Error ? e.message : "Unknown error" }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
