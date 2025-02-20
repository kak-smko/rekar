<template>
  <div class="laws" v-if="page">
    <r-meta
      :title="page.title + ' | '"
      :description="page.seo_description"
      :keywords="page.seo_keywords"
      :url="$route.fullPath"
    ></r-meta>
    <r-container> laws </r-container>
  </div>
</template>

<script>
export default {
  name: "law",
  data() {
    return {
      page: null,
    };
  },
};
</script>
