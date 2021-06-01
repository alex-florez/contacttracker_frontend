<template>
    <v-app>
        <!-- APP BAR -->
        <v-app-bar app color="teal darken-2" dark>
            <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>
            <v-toolbar-title>Contact Tracker</v-toolbar-title>
            <v-spacer></v-spacer>
            <v-btn icon>
                <v-icon>mdi-magnify</v-icon>
            </v-btn>
        </v-app-bar>

        <!-- NAVIGATION DRAWER -->
        <v-navigation-drawer v-model="drawer" fixed clipped="true" temporary>

            <!-- NAV HEADER -->
            <v-list>
                <v-list-item>
                    <v-list-item-title class="title">Contact Tracker</v-list-item-title>
                </v-list-item>
            </v-list>

            <v-divider></v-divider>

            <!-- Opciones de Menú -->
            <v-list nav dense>
                <v-list-item-group v-model="group" active-class="teal lighten-2 white--text text--accent-4">
                    <v-list-item :to="'/'">
                        <v-list-item-action>
                            <v-icon>mdi-home</v-icon>
                        </v-list-item-action>
                        <v-list-item-title>Foo</v-list-item-title>
                    </v-list-item>

                    <v-list-item :to="'/about'">
                        <v-list-item-action>
                            <v-icon>mdi-point-of-sale</v-icon>
                        </v-list-item-action>
                        <v-list-item-title>Bar</v-list-item-title>
                    </v-list-item>
                </v-list-item-group>
            </v-list>
        </v-navigation-drawer>

        <!-- CONTENIDO -->
        <v-content>
            <v-container fluid>
            <v-fade-transition mode="out-in">
              <router-view></router-view>
            </v-fade-transition>
            </v-container>
        </v-content>
    </v-app>    
</template>

<script>
    export default {
        name: 'AppLayout',
        data: () => ({
            drawer: false,
            group: null,
        }),
        watch: { 
            group () { // Oculta el Drawer al seleccionar una opción
                this.drawer = false
            },
        },
    }
</script>
