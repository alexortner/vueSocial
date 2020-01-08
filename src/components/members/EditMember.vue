<template>
    <v-dialog v-model="dialog" fullscreen hide-overlay transition="dialog-bottom-transition">
      <template v-slot:activator="{ on }">
        <v-btn icon v-on="on">
          <v-icon>mdi-pencil</v-icon>
        </v-btn>
      </template>
      <v-card> 
        <v-toolbar dark color="primary">
          <v-btn icon dark @click="dialog = false">
            <v-icon>mdi-close</v-icon>
          </v-btn>
          <v-toolbar-title>Daten von {{member.vorname}} {{member.nachname}} {{member.namensziffer}} editieren</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-toolbar-items>
            <v-btn dark text @click="dialog = false">Speichern</v-btn>
          </v-toolbar-items>
        </v-toolbar>
        <v-form>
          <v-card class=ma-5>
            <v-card-title>Website Zugang</v-card-title>
            <v-list dense>
              <v-list-item >
                <v-list-item-content>
                  <v-text-field
                    v-model="email_value"
                    :rules="emailRules"
                    label="E-mail"
                    name="email"
                    required
                    prepend-icon="mdi-email"
                  ></v-text-field>
                </v-list-item-content>
              </v-list-item>
              <v-list-item>
                <v-list-item-content>
                  <v-text-field
                    v-model="password_value"
                    label="Passwort"
                    required
                    error-message="feedback"
                    message="test"
                    :type="showPassword ? 'txt' :'password'"
                    prepend-icon="mdi-lock"
                    :append-icon="showPassword? 'mdi-eye' :'mdi-eye-off'"
                    @click:append="showPassword = !showPassword"
                  >
                  </v-text-field>
                </v-list-item-content>
              </v-list-item>
              <v-list-item>
                <v-select
                  label="Website Berechtigung"
                  v-model="authLevels_value"
                  :items="authLevels_items"
                  prepend-icon="mdi-shield-key"
                ></v-select>
              </v-list-item>
            </v-list>
          </v-card>
          <v-card class=ma-5>
            <v-card-title>Persönliche Daten</v-card-title>
            <v-list dense>
              <v-list-item>
                <v-list-item-content>
                  <v-text-field
                    v-model="member.vorname"
                    label="Vorname"
                    name="vorname"
                    prepend-icon="mdi-account"
                  >
                  </v-text-field>
                </v-list-item-content>
              </v-list-item>
              <v-list-item>
                <v-text-field
                    v-model="member.nachname"
                    label="Nachname"
                    name="nachname"
                    prepend-icon="mdi-account"
                  >
                  </v-text-field>
              </v-list-item>
              <v-list-item>
                <v-text-field
                    v-model="member.namensziffer"
                    label="Namensziffer"
                    name="namensziffer"
                    prepend-icon="mdi-counter"
                    hint="Im Falle dass mehrer Familienmitglieder Bundesbrüder sind wird eine Namensziffer (I,II,III) hochgezählt"
                  >
                  </v-text-field>
              </v-list-item>
              <v-list-item>
                <v-menu
                  ref="menu"
                  v-model="menu"
                  :close-on-content-click="false"
                  transition="scale-transition"
                  offset-y
                  full-width
                  min-width="290px"
                  >
                    <template v-slot:activator="{ on }">
                      <v-text-field
                        v-model="member.geburtstag"
                        label="Geburtstag"
                        prepend-icon="mdi-cake"
                        v-on="on"
                      ></v-text-field>
                    </template>
                    <v-date-picker
                      ref="picker"
                      v-model="member.geburtstag"
                      :max="new Date().toISOString().substr(0, 10)"
                      min="1920-01-01"
                      @change="save"
                    ></v-date-picker>
                  </v-menu>
              </v-list-item>
            </v-list>
          </v-card>

          <v-card class=ma-5>
            <v-card-title>Kontakt Privat</v-card-title>
            <v-list dense>
              <v-list-item>
                <v-list-item-content>
                  <v-text-field
                    v-model="member.strasseprivat"
                    label="Strasse"
                    name="strasse_privat"
                    prepend-icon="mdi-map-marker"
                  >
                  </v-text-field>
                </v-list-item-content>
              </v-list-item>
              <v-list-item>
                <v-text-field
                    v-model="member.plzprivat"
                    label="Postleitzahl"
                    name="plz_privat"
                    prepend-icon="mdi-compass"
                  >
                  </v-text-field>
              </v-list-item>
              <v-list-item>
                <v-text-field
                    v-model="member.ortprivat"
                    label="Ort"
                    name="ort_privat"
                    prepend-icon="mdi-city"
                  >
                  </v-text-field>
              </v-list-item>
              <v-list-item >
                <v-list-item-content>
                  <v-select
                    label="Land"
                    v-model="member.landprivat"
                    :items="titel_items"
                    prepend-icon="mdi-map-search"
                  ></v-select>
                </v-list-item-content>
              </v-list-item>
              <v-list-item>
                <v-text-field
                    v-model="member.mobilprivat"
                    label="Mobil"
                    name="mobil_privat"
                    prepend-icon="mdi-cellphone-iphone"
                  >
                  </v-text-field>
              </v-list-item>
              <v-list-item>
                <v-text-field
                    v-model="member.telefonprivat"
                    label="Telefon"
                    name="telefon_privat"
                    prepend-icon="mdi-phone"
                  >
                  </v-text-field>
              </v-list-item>
              <v-list-item>
                <v-text-field
                    v-model="member.faxprivat"
                    label="Fax"
                    name="fax_privat"
                    prepend-icon="mdi-fax"
                  >
                  </v-text-field>
              </v-list-item>
            </v-list>
          </v-card>

          <v-card class=ma-5>
            <v-card-title>Kontakt Geschäftlich</v-card-title>
            <v-list dense>
              <v-list-item>
                <v-text-field
                    v-model="member.beruf"
                    label="Beruf"
                    name="beruf"
                    prepend-icon="mdi-tools"
                  >
                </v-text-field>
              </v-list-item>
              <v-list-item>
                <v-text-field
                    v-model="member.firma"
                    label="Firma"
                    name="firma"
                    prepend-icon="mdi-bank"
                  >
                </v-text-field>
              </v-list-item>
              <v-list-item>
                <v-text-field
                    v-model="member.abteilung"
                    label="Stellung/ Abteilung"
                    name="stellung"
                    prepend-icon="mdi-arm-flex"
                  >
                </v-text-field>
              </v-list-item>
              <v-list-item>
                <v-list-item-content>
                  <v-text-field
                    v-model="member.strassegesch"
                    label="Strasse"
                    name="strasse_gesch"
                    prepend-icon="mdi-map-marker"
                  >
                  </v-text-field>
                </v-list-item-content>
              </v-list-item>
              <v-list-item>
                <v-text-field
                    v-model="member.plzgesch"
                    label="Postleitzahl"
                    name="plz_gesch"
                    prepend-icon="mdi-compass"
                  >
                  </v-text-field>
              </v-list-item>
              <v-list-item>
                <v-text-field
                    v-model="member.ortgesch"
                    label="Ort"
                    name="ort_gesch"
                    prepend-icon="mdi-city"
                  >
                  </v-text-field>
              </v-list-item>
              <v-list-item >
                <v-list-item-content>
                  <v-select
                    label="Land"
                    v-model="member.landgesch"
                    :items="titel_items"
                    prepend-icon="mdi-map-search"
                  ></v-select>
                </v-list-item-content>
              </v-list-item>
              <v-list-item>
                <v-text-field
                    v-model="member.mobilgesch"
                    label="Mobil"
                    name="mobil_gesch"
                    prepend-icon="mdi-cellphone-iphone"
                  >
                  </v-text-field>
              </v-list-item>
              <v-list-item>
                <v-text-field
                    v-model="member.telefongesch"
                    label="Telefon"
                    name="telefon_gesch"
                    prepend-icon="mdi-phone"
                  >
                  </v-text-field>
              </v-list-item>
              <v-list-item>
                <v-text-field
                    v-model="member.faxgesch"
                    label="Fax"
                    name="fax_gesch"
                    prepend-icon="mdi-fax"
                  >
                  </v-text-field>
              </v-list-item>
            </v-list>
          </v-card>

          <v-card class=ma-5>
            <v-card-title>Ausbildung</v-card-title>
            <v-list dense>
              <v-list-item >
                <v-list-item-content>
                  <v-select
                    label="Akademischer Grad"
                    v-model="member.titel"
                    :items="titel_items"
                    prepend-icon="mdi-school"
                  ></v-select>
                </v-list-item-content>
              </v-list-item>
              <v-list-item>
                <v-text-field
                    v-model="member.abschluss"
                    label="Abschluss"
                    name="abschluss"
                    prepend-icon="mdi-school"
                  >
                  </v-text-field>
              </v-list-item>
              <v-list-item>
                <v-text-field
                    v-model="member.studium"
                    label="Studium"
                    name="studium"
                    prepend-icon="mdi-bank"
                  >
                </v-text-field>
              </v-list-item>
              
            </v-list>
          </v-card>

          <v-card class=ma-5>
            <v-card-title>Bundesinterne Daten</v-card-title>
            <v-list dense>
              <v-list-item >
                <v-list-item-content>
                  <v-select
                    label="Status"
                    v-model="member.status"
                    :items="status_list_items"
                    prepend-icon="mdi-chess-pawn"
                    small-chips
                  ></v-select>
                </v-list-item-content>
              </v-list-item>
              <v-list-item>
                <v-select
                    label="Eintrittssemester"
                    v-model="member.eintritt"
                    :items="semester_list_items"
                    prepend-icon="mdi-bullseye-arrow"
                    hint="Eintrittssemester in die T! Markomanno-Albertia"
                    persistent-hint
                  ></v-select>
              </v-list-item>
              <v-list-item>
                <v-select
                    label="Mutterbund"
                    v-model="member.mutterbund"
                    :items="bund_list_items"
                    prepend-icon="mdi-chess-king"
                    small-chips
                  ></v-select>
              </v-list-item>
              
              
              <v-list-item>
                <v-select
                    label="Weitere Bünde"
                    v-model="member.zweitbund"
                    :items="bund_list_items"
                    prepend-icon="mdi-chess-queen"
                    small-chips
                    deletable-chips
                    multible
                  ></v-select>
              </v-list-item>
              <v-list-item>
                <v-select
                    label="Ortsgruppe"
                    v-model="member.ortsgruppe"
                    :items="ortsgruppen_list_items"
                    prepend-icon="mdi-home-map-marker"
                  ></v-select>
              </v-list-item>
              <v-list-item>
                <v-text-field
                    v-model="member.chargen"
                    label="Chargen"
                    name="chargen"
                    prepend-icon="mdi-human-handsup"
                  >
                </v-text-field>
              </v-list-item>
              <v-list-item>
                <v-text-field
                    v-model="member.amter"
                    label="Ämter"
                    name="amter"
                    prepend-icon="mdi-emoticon-cool-outline"
                  >
                </v-text-field>
              </v-list-item>
              <v-list-item>
                <v-text-field
                    v-model="member.partien"
                    label="Partien"
                    name="partien"
                    prepend-icon="mdi-sword-cross"
                  >
                </v-text-field>
              </v-list-item>
              <v-list-item>
                <v-text-field
                    v-model="member.leibbursch"
                    label="Leibbursch"
                    name="leibbursch"
                    prepend-icon="mdi-human-male-boy"
                  >
                </v-text-field>
              </v-list-item>
              <v-list-item>
                <v-text-field
                    v-model="member.leibfuexe"
                    label="Leibfüxe"
                    name="leibfuexe"
                    prepend-icon="mdi-baby"
                  >
                </v-text-field>
              </v-list-item>
            </v-list>
          </v-card>

          <v-card class=ma-5>
            <v-card-title>Lebenslauf</v-card-title>
                  <v-textarea
                    v-model="member.lebenslauf"
                    class="mx-2"
                    label="Eigener Lebenslauf"
                    rows="5"
                    prepend-icon="mdi-file-document"
                    auto-grow
                  ></v-textarea>
                  <v-textarea
                    v-model="member.lebenslaufmab"
                    class="mx-2"
                    label="MA-Blatt Vorstellung"
                    rows="5"
                    prepend-icon="mdi-book-open-page-variant"
                    auto-grow
                  ></v-textarea>
                  <v-textarea
                    v-model="member.nachruf"
                    class="mx-2"
                    label="Nachruf"
                    rows="5"
                    prepend-icon="mdi-christianity"
                    auto-grow
                  ></v-textarea>
          </v-card>
        </v-form>
      </v-card>
    </v-dialog>
</template>

<script>
  import {DataConversion} from '@/components/mixins/MixinMethods.js'

  export default {
    name: 'EditMember',
    mixins: [DataConversion],
    props: {
      member: Object
    },
    data () {
      return {
        // Website Zugang
        email_value: null,
        password_value: null,
        showPassword: false,
        authLevels_value: 'Benutzer',
        
        menu: null,
        dialog: false,
        notifications: false,
        sound: true,
        widgets: false,
        emailRules: [
        v => !!v || 'Bitte E-mail eingeben',
        v => /.+@.+\..+/.test(v) || 'Bitte gültige E-mail eingeben',
      ],
      }
    },
    computed: {
      semester_list_items(){
        var start_year=1950
        var end_year=2020
        var semester=[]

        for(var i=end_year;i>start_year;i--){
          var j=i+1
    
          var text="WS " + i + "/" + j
          var value=i + "-ws"
          semester.push({text,value})
          text="SS " + i
          value=i + "-ss"
          semester.push({text,value}) 
        }

        return semester
      }
    },
    watch: {
      menu (val) {
        val && setTimeout(() => (this.$refs.picker.activePicker = 'YEAR'))
      },
    },
    methods: {
      save (date) {
        this.$refs.menu.save(date)
      },
      
    }


  }
</script>



