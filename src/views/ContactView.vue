<script setup>

</script>
<template>
  <div class="content-body">
    <div class="container contact-view">
      <div class="flex-column container-row d-flex flex-md-row justify-content-between">
        <div class="col order-2 order-md-1 d-flex flex-column justify-content-between me-md-3">
          <h2>About Us</h2>
          <p>Prisoner Express creates an opportunity for incarcerated men and women to get information, education and a
            public forum for creative self-expression.Through our newsletters and programs we step through the isolation
            and alienation of prison life – our goal is to bring hope and foster a sense of community among the
            prisoners who participate.</p>
          <div class="rounded p-3 mb-3" style="background-color: #F8F9FB;border-radius: 5px;">
            <i class="pi pi-map-marker"></i><b> Mailing Address:</b>
            <br/>
            CTA / Durland Alternatives Library
            <br />
            Prisoner Express
            <br />
            PO Box #6556, Ithaca, NY 14851
          </div>
          <div class="rounded p-3" style="background-color: #F8F9FB;border-radius: 5px;">
            <i class="pi pi-phone"></i><b> Phone Number:</b>
            <br/>
            (607) 255-6486
          </div>
        </div>
        <div class="col order-1 order-md-2" style="flex: 1 1 0%;">
          <img :src="`${baseDir}Prisoner-Express-Logo-No-Bars.png`"
            class="img-fluid img-thumbnail" alt="prisoner express logo" style="height: 100%; object-fit: contain">
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.contact-view {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  overflow-y: auto;

}
.container-row {
  overflow-y: auto;
  max-height: 100%;
}
</style>
