<template>
  <div class="grid grid-cols-12 gap-5">
    <div class="col-span-full">
      <h1>Resume Analyzer</h1>
      <input type="file" @change="handleFileUpload" accept=".pdf" />
    </div>

    <div class="col-span-full">
      <div v-if="resumeData">
        <h2>Extracted Information</h2>
        <pre>{{ JSON.stringify(resumeData, null, 2) }}</pre>
      </div>
      <div v-if="analysis">
        <h2>Summary</h2>
        <p>{{ analysis.summary }}</p>
        <h2>Matching Score</h2>
        <p>{{ analysis.matchingScore }}</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useFetch } from "nuxt/app";
import { ref } from "vue";

const resumeData = ref(null);
const analysis = ref(null);

const handleFileUpload = async (event:any) => {
  const file = event.target.files[0];
  const formData = new FormData();
  formData.append("resume", file);

  const { data } = await useFetch("/api/resume/upload", {
    method: "POST",
    body: formData,
  });

  const { result } = data.value;

  console.log(result);

  resumeData.value = result.personal;

  // Assuming you have a job description stored somewhere
  const jobDescription =
    "Good experience with HTML5, CSS, JavaScript [ES6], having intermediate (or above) skills using ReactJS (NextJS). Having experience with Vue, JQuery, SASS/ LESS, and TailwindCSS is a plus.";

  const { data: analysisData } = await useFetch("/api/resume/analyze", {
    method: "POST",
    body: {
      resumeContent: result.content, // You might need to read the file content here
      jobDescription,
    },
  });

  console.log(analysisData.value);

  analysis.value = analysisData.value;
};
</script>

<style scoped></style>
