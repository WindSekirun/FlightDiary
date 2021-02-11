<template>
  <v-app id="inspire">
    <v-app-bar color="#3b4252" class="appBar" app hide-on-scroll>
      <v-container class="py-0 fill-height">
        <v-btn text @click="clickHome()">
          <v-avatar class="mr-4" size="32">
            <img src="./assets/profile_akari_circle.png" alt="Profile" />
          </v-avatar>
          <b> {{ title }}</b>
        </v-btn>

        <v-btn
          v-for="(link, index) in appBarLinks"
          :key="index"
          text
          @click="clickAppBarLink(link)"
        >
          {{ link.name }}
        </v-btn>

        <v-spacer></v-spacer>

        <v-menu bottom left :close-on-click="true">
          <template v-slot:activator="{ on, attrs }">
            <v-btn dark icon v-bind="attrs" v-on="on">
              <v-icon>mdi-dots-vertical</v-icon>
            </v-btn>
          </template>

          <v-list>
            <v-list-item
              v-for="(item, index) in subBarLinks"
              :key="index"
              @click="clickAppBarLink(item)"
            >
              <v-list-item-title>
                {{ item.name }}
              </v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>
      </v-container>
    </v-app-bar>

    <v-main>
      <v-container>
        <router-view />
      </v-container>
    </v-main>

    <v-footer inset padless color="#2e3440">
      <flight-footer class="mt-5" />
    </v-footer>
  </v-app>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { applicationTitle } from "./Constants";
import FlightFooter from "@/components/common/FlightFooter.vue";
import {
  pageAbout,
  pageSpec,
  PageRouter,
  pageHome,
  pageCollection
} from "./model/PageRouter";

@Component({
  components: {
    FlightFooter
  }
})
export default class Home extends Vue {
  @Prop({ default: applicationTitle })
  title!: string;
  appBarLinks: PageRouter[] = [pageCollection];
  subBarLinks: PageRouter[] = [pageSpec, pageAbout];

  async mounted() {
    this.title = applicationTitle;
  }

  clickHome() {
    this.$router.push({
      name: pageHome.name
    });
  }

  clickAppBarLink(pageRouter: PageRouter) {
    this.$router.push(pageRouter.path);
  }
}
</script>

<style>
#app,
.application--wrap,
.content {
  width: 100%;
  height: 100%;
}
.application--wrap {
  min-height: 100%;
}
.content--wrap {
  height: calc(100% - 48px);
  height: -webkit-calc(100% - 48px);
}
.container {
  padding: 0;
}

.v-application {
  background-color: var(--v-background-base) !important;
}
</style>
