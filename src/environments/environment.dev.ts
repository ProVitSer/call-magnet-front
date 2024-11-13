const API_GATEWAY_URL = 'http://localhost:3000';

export const environment = {
    production: false,
    API_GATEWAY_URL: API_GATEWAY_URL,
    USER_PROFILE_URL: `${API_GATEWAY_URL}/user`,
    CALL_ANALITICS_URL: `${API_GATEWAY_URL}/call-analytics`,
    VOICE_KIT_TTS_URL: `${API_GATEWAY_URL}/voice-kit/tts`,
    VOICE_KIT_STT_URL: `${API_GATEWAY_URL}/voice-kit/stt/dialog`,
    CQA_CONFIG_URL: `${API_GATEWAY_URL}/cqa/config`,
    CQA_STAT_URL: `${API_GATEWAY_URL}/cqa/statistic`,
    CRM_URL: `${API_GATEWAY_URL}/crm/config`,
    MISSED_CALL_URL: `${API_GATEWAY_URL}/missed-call`,
    PAC_URL: `${API_GATEWAY_URL}/pac`,
    SMART_ROUTING_URL: `${API_GATEWAY_URL}/smart-routing`,
    SMS_URL: `${API_GATEWAY_URL}/sms`,
    SMS_CONFIG_URL: `${API_GATEWAY_URL}/sms/config`,
    VOIP_URL: `${API_GATEWAY_URL}/voip/trunk`,
    TG_MESSAGES_URL: `${API_GATEWAY_URL}/tg/messages`,
    TG_CONFIG_URL: `${API_GATEWAY_URL}/tg/config`,
    TG_USERS_URL: `${API_GATEWAY_URL}/tg/users`,
    CRYPTO_SK: 'e3414777ba15bb179b1da437ef737d36888548da0d31f26b313b5ca54d428f68',
    CRYPTO_IV: '85407ce399784374f859e76e1471a724',
};
