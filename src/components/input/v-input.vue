<template>
  <div>
    <div
      class="required"
      style="
        color: #8181a5;
        font-family: Lato;
        font-size: 14px;
        font-style: normal;
        font-weight: 400;
        line-height: 21px;
        cursor: default;
      "
    >
      Full name
    </div>
    <div
      style="
        transition: border-bottom-color 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        border-bottom-style: solid;
        border-bottom-width: 1px;
        padding: 6px 0 17px 0;
        position: relative;
      "
      :style="{ borderBottomColor: borderBottomColor }"
    >
      <div style="position: absolute; right: 0; bottom: 19px">
        <icon-local-fullname :fill="color" />
      </div>
      <input
        class="__input__"
        style="
          border: none;
          color: #1c1d21;
          font-family: Lato;
          font-size: 14px;
          font-style: normal;
          font-weight: 700;
          line-height: normal;
          width: 100%;
          padding-right: 22px;
        "
        type="text"
        placeholder="Start typing…"
        v-model="model.fullname"
        @focus="inputFocus = true"
        @blur="onBlur"
        @input="validate()"
      />
    </div>
    <div
      style="
        color: #ff808b;
        font-family: Lato;
        font-size: 14px;
        font-style: normal;
        font-weight: 400;
        line-height: 21px;
        transition: opacity 0.3s cubic-bezier(0.4, 0, 0.2, 1);
      "
      :style="{ opacity: showError }"
    >
      Please enter your full name
    </div>
  </div>
</template>
<script lang="ts">

</script>
<style scoped></style>