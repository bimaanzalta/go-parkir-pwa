<!-- src/views/QrScan.vue -->

<template>
  <div class="qr-scan h-screen">
    <h1>QR Code Scanner</h1>
    <div class="" @click="hitApi()">
      <qrcode-stream @detect="onDecode" @init="onInit">
        <div v-if="error" class="error">{{ error }}</div>
      </qrcode-stream>
    </div>
    <!-- Popup Dialog -->
    <div v-if="showPopup" class="popup">
      <div class="popup-content">
        <h2>QR Scan Result</h2>
        <p>{{ popupMessage }}</p>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { QrcodeStream } from 'vue-qrcode-reader';
import axios from 'axios';
import { useAuth } from '@/auth';
import { useRouter } from 'vue-router';
const result = ref<string | null>(null);
const error = ref<string | null>(null);
const showPopup = ref(false);
const popupMessage = ref('');
const logs = ref<string[]>([]);
const { userData } = useAuth();
const router = useRouter();

const hitApi = async () => {
  try {
    // Call API if validation passes
    const response = await axios.post(`http://localhost:3000/api/transaksi/create/aOA4QHu2aA`, { userId: userData.value.id });

    router.push('/');
  } catch (apiError: any) {
    console.error('API Call Error:', apiError);
  }
};

async function onDecode(decodedText: any) {
  result.value = decodedText;

  // Check if QR code includes a specific keyword
  if (decodedText[0].rawValue.includes('ngrok-free.app')) {
    const lastSegment = decodedText[0].rawValue.split('/').pop();

    try {
      // Call API if validation passes
      const response = await axios.post(`http://localhost:3000/api/transaksi/create/${lastSegment}`, { userId: userData.value.id });
      popupMessage.value = `Pembayaran Berhasil`;
      showPopup.value = true;
      setTimeout(() => {
        router.push('/');
      }, 2500);
    } catch (apiError: any) {
      console.error('API Call Error:', apiError);
      popupMessage.value = 'Pembayaran Gagal';
      showPopup.value = true;
      setTimeout(() => {
        router.push('/');
      }, 2500);
    }
  } else {
    popupMessage.value = 'Invalid QR Code';
    showPopup.value = true;
  }
}

// // Handle QR decoding
// const onDecode = async (decodedText: string) => {
//   result.value = decodedText;
//   addLog(`Scanned QR Code: ${decodedText}`);

//   // Check if QR code includes a specific keyword
//   if (decodedText.includes('ngrok-free.app')) {
//     const lastSegment = decodedText.split('/').pop();
//     addLog(`Valid QR code segment found: ${lastSegment}`);

//     try {
//       // Call API if validation passes
//       const response = await axios.post(`https://96a5-114-10-137-158.ngrok-free.app/api/transaksi/create/${lastSegment}`, { userId: userData.value.id });
//       popupMessage.value = `API Response ID: ${response.data.id}`;
//       showPopup.value = true;
//       addLog(`API call successful: ${response.data.id}`);
//     } catch (apiError: any) {
//       console.error('API Call Error:', apiError);
//       popupMessage.value = 'Error calling the API';
//       showPopup.value = true;
//       addLog(`API call failed: ${apiError.message}`);
//     }
//   } else {
//     popupMessage.value = 'Invalid QR Code';
//     showPopup.value = true;
//     addLog('Invalid QR code scanned');
//   }
// };

// Handle camera initialization
const onInit = (promise: Promise<void>) => {
  promise
    .then(() => {
      console.log('Camera initialized successfully');
    })
    .catch((initError) => {
      error.value = 'Failed to initialize camera. Please check permissions.';
      console.error(initError);
      console.log(`Camera initialization failed: ${initError.message}`);
    });
};

const closePopup = () => {
  showPopup.value = false;
};
</script>

<style scoped>
.qr-scan {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 20px;
}
.error {
  color: red;
  margin-top: 10px;
}

/* Popup Styles */
.popup {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.6);
  display: flex;
  justify-content: center;
  align-items: center;
}

.popup-content {
  background: white;
  padding: 20px;
  text-align: center;
  border-radius: 8px;
  max-width: 300px;
}

button {
  margin-top: 15px;
  padding: 10px 20px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}
button:hover {
  background-color: #0056b3;
}

/* Log Section Styles */
.log-section {
  margin-top: 20px;
  padding: 10px;
  width: 100%;
  max-width: 400px;
  background-color: #f7f7f7;
  border-radius: 8px;
}
.log-section h2 {
  font-size: 18px;
  margin-bottom: 10px;
}
.log-section ul {
  list-style: none;
  padding: 0;
}
.log-section li {
  font-size: 14px;
  padding: 5px 0;
  border-bottom: 1px solid #ddd;
}
</style>
