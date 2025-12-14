
// CRC16-CCITT (0xFFFF)
// CRC16-CCITT (0xFFFF) - Polynomial 0x1021
function crc16ccitt(str: string): string {
    let crc = 0xFFFF;
    const strlen = str.length;

    for (let c = 0; c < strlen; c++) {
        crc ^= str.charCodeAt(c) << 8;
        for (let i = 0; i < 8; i++) {
            if ((crc & 0x8000) !== 0) {
                crc = ((crc << 1) ^ 0x1021) & 0xFFFF;
            } else {
                crc = (crc << 1) & 0xFFFF;
            }
        }
    }
    const hex = (crc & 0xFFFF).toString(16).toUpperCase();
    return ("0000" + hex).slice(-4);
}

function formatCrc(str: string): string {
    const crc = crc16ccitt(str + "6304"); // Include ID 63 and length 04 placeholder
    return str + "6304" + crc;
}

function pad(str: string, pad = "00"): string {
    return (pad + str).slice(-pad.length);
}

// TLV Helper
function tlv(id: string, value: string): string {
    const len = pad(value.length.toString(), "00");
    return id + len + value;
}

// Helper to remove accents and special characters
function normalize(str: string): string {
    return str
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "") // Remove accents
        .replace(/[^a-zA-Z0-9 ]/g, " "); // Allow only alphanumeric and spaces
}

export function generateStaticPixString(key: string, name: string, city: string, amount: number, txid: string = "***"): string {
    const nameStr = normalize(name).substring(0, 25).toUpperCase();
    const cityStr = normalize(city).substring(0, 15).toUpperCase();
    const amountStr = amount.toFixed(2);

    // Merchant Account Information (GUI, CHAVE, INFO)
    // 00 - GUI: br.gov.bcb.pix
    // 01 - Key
    // 02 - Desc (Optional)
    const merchantAccount = tlv("00", "br.gov.bcb.pix") + tlv("01", key);

    // Main Payload Construction
    let payload =
        tlv("00", "01") + // Payload Format Indicator
        tlv("26", merchantAccount) + // Merchant Account Information
        tlv("52", "0000") + // Merchant Category Code
        tlv("53", "986") + // Transaction Currency (BRL)
        tlv("54", amountStr) + // Transaction Amount
        tlv("58", "BR") + // Country Code
        tlv("59", nameStr) + // Merchant Name
        tlv("60", cityStr) + // Merchant City
        tlv("62", tlv("05", txid)); // Additional Data Field (TxID)

    return formatCrc(payload);
}
