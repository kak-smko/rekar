<template>
  <r-container class="pa-0" full-width>
    <r-meta
      title="404 page"
      description="404 page: not found"
      :url="$route.path"
    ></r-meta>
    <r-row class="color-header no-gutters">
      <r-col>
        <r-container class="pt-12 mt-12 pb-0">
          <r-row class="mt-12 pt-12">
            <r-col class="col-12">
              <h1 class="line-btm display-4">صفحه مورد نظر یافت نشد:(</h1>
            </r-col>
            <r-col class="col-12">
              <r-search-box url="/home/blogs/search" :label="$t('search')">
                <template v-slot="{ item }">
                  <router-link
                    class="w-full"
                    :to="{ name: 'singleBlog', params: { blog_id: item._id } }"
                  >
                    <r-row>
                      <r-col class="col-4 md-2">
                        <r-img
                          class="pa-2 h-end"
                          :src="'/' + item.images[0]"
                          :alt="item.title"
                          width="120"
                          height="120"
                        ></r-img>
                      </r-col>
                      <r-col class="text-start col-8 md-10">
                        <div class="title">{{ item.title }}</div>
                        <div class="body-1 text-truncate">
                          {{ item.seo_description }}
                        </div>
                      </r-col>
                    </r-row>
                  </router-link>
                </template>
              </r-search-box>
            </r-col>
          </r-row>
        </r-container>
      </r-col>
    </r-row>
    <r-row class="mt-12">
      <r-col>
        <r-img
          src="/storage/img/site/404.jpg"
          alt="404 page"
          auto-size
          :wPerh="2"
        ></r-img>
      </r-col>
    </r-row>
  </r-container>
</template>

<script>
export default {
  name: "notFound",
  metaInfo: {
    title: "notFound",
  },
};
</script>

<style scoped></style>
