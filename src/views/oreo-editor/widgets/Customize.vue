<!-- eslint-disable vue/no-mutating-props -->
<!-- eslint-disable vue/valid-v-model -->
<template>
    <div class="customizes" @contextmenu.prevent="() => {}">
        <a-collapse
            :default-active-key="['1', '2', '3', '4', '5']"
            :bordered="false"
            :show-expand-icon="false"
            expand-icon-position="right"
        >
            <!-- 基础样式开始 -->
            <a-collapse-item header="Designed" key="1">
                <div class="align_group">
                    <v-btn
                        variant="text"
                        icon="mdi-align-horizontal-center"
                        size="x-small"
                        @click="props.align.horizontalCenter"
                    />
                    <v-btn
                        variant="text"
                        icon="mdi-align-vertical-center"
                        size="x-small"
                        @click="props.align.verticalCenter"
                    />
                    <v-btn
                        variant="text"
                        icon="mdi-align-vertical-top"
                        size="x-small"
                        @click="props.align.verticalTop"
                    />
                    <v-btn
                        variant="text"
                        icon="mdi-align-vertical-bottom"
                        size="x-small"
                        @click="props.align.verticalBottom"
                    />
                    <v-btn
                        variant="text"
                        icon="mdi-align-horizontal-left"
                        size="x-small"
                        @click="props.align.horizontalLeft"
                    />
                    <v-btn
                        variant="text"
                        icon="mdi-align-horizontal-right"
                        size="x-small"
                        @click="props.align.horizontalRight"
                    />

                    <!-- <v-btn
                        variant="text"
                        icon="mdi-align-horizontal-distribute"
                        size="x-small"
                        class="mt-2"
                        @click="props.align.horizontalDistribute"
                    />
                    <v-btn
                        variant="text"
                        icon="mdi-align-vertical-distribute"
                        size="x-small"
                        class="ml-0 mt-2"
                        @click="props.align.verticalDistribute"
                    /> -->
                </div>
                <a-divider class="my-2 mb-3"></a-divider>
                <a-row :gutter="8">
                    <a-col :span="12">
                        <a-input-number v-model="styleData.styles.left" size="mini"
                            ><template #prepend>X</template></a-input-number
                        >
                    </a-col>
                    <a-col :span="12">
                        <a-input-number v-model="styleData.styles.top" size="mini"
                            ><template #prepend>Y</template></a-input-number
                        >
                    </a-col>
                    <a-col :span="12" class="mt-2">
                        <a-input-number v-model="styleData.styles.width" size="mini"
                            ><template #prepend>W</template></a-input-number
                        >
                    </a-col>
                    <a-col :span="12" class="mt-2">
                        <a-input-number v-model="styleData.styles.height" size="mini"
                            ><template #prepend>H</template></a-input-number
                        >
                    </a-col>
                    <div class="d-flex mt-3" style="height: 24px">
                        <v-btn variant="text" disabled icon="mdi-scan-helper" size="x-small" />
                        <a-slider
                            v-model="styleData.styles.radius"
                            style="width: 98px"
                            size="mini"
                            class="mx-2"
                        />
                        <a-input-number
                            style="width: 72px"
                            v-model="styleData.styles.radius"
                            size="mini"
                            class="ml-1"
                        />
                    </div>
                    <div class="d-flex mt-3" style="height: 24px">
                        <v-btn variant="text" disabled icon="mdi-restore" size="x-small" />
                        <a-slider
                            disabled
                            v-model="styleData.styles.rotate"
                            style="width: 98px"
                            class="mx-2"
                        />
                        <a-input-number
                            disabled
                            style="width: 72px"
                            v-model="styleData.styles.rotate"
                            size="mini"
                            class="ml-1"
                        />
                    </div>
                    <div class="d-flex mt-3" style="height: 24px">
                        <v-btn variant="text" disabled icon="mdi-eye-outline" size="x-small" />
                        <a-slider
                            v-model="styleData.styles.opacity"
                            :max="1"
                            :min="0.0"
                            :step="0.01"
                            style="width: 98px"
                            class="mx-2"
                        />
                        <a-input-number
                            style="width: 72px"
                            v-model="styleData.styles.opacity"
                            size="mini"
                            class="ml-1"
                        />
                    </div>
                </a-row>
            </a-collapse-item>
            <!-- 基础样式结束 -->
            <!-- 填充样式开始 -->
            <a-collapse-item v-if="showExterior" header="Exterior" key="2">
                <a-row :gutter="8">
                    <a-col :span="4" class="pt-1">
                        <a-checkbox v-model="styleData.styles.fill"
                    /></a-col>
                    <a-col :span="3">
                        <a-color-picker showPreset v-model="styleData.styles.background">
                            <a-tag :color="styleData.styles.background" class="tag_mini"> </a-tag>
                        </a-color-picker>
                    </a-col>
                    <a-col :span="16">Fill</a-col>
                    <a-col :span="4" class="mt-2 pt-1">
                        <a-checkbox v-model="styleData.styles.border"
                    /></a-col>
                    <a-col :span="3" class="mt-2">
                        <a-color-picker showPreset v-model="styleData.styles.borderColor">
                            <a-tag :color="styleData.styles.borderColor" class="tag_mini"> </a-tag>
                        </a-color-picker>
                    </a-col>
                    <a-col :span="16" class="mt-2">Border</a-col>
                    <a-col :span="4" class="mt-2"> </a-col>
                    <a-col :span="8" class="mt-2">
                        <a-select
                            v-model="styleData.styles.borderWidth"
                            style="flex: 1"
                            size="mini"
                        >
                            <a-option v-for="item in 30" :key="item" :value="item">{{
                                item
                            }}</a-option>
                        </a-select>
                    </a-col>
                    <a-col :span="12" class="mt-2">
                        <a-select
                            v-model="styleData.styles.borderStyle"
                            style="flex: 1"
                            size="mini"
                        >
                            <a-option value="solid">Solid</a-option>
                            <a-option value="dashed">Dashed</a-option>
                        </a-select>
                    </a-col>

                    <a-col :span="4" class="mt-3 pt-1">
                        <a-checkbox v-model="styleData.styles.shadow"
                    /></a-col>
                    <a-col :span="3" class="mt-3">
                        <a-color-picker showPreset v-model="styleData.styles.shadowColor">
                            <a-tag :color="styleData.styles.shadowColor" class="tag_mini"> </a-tag>
                        </a-color-picker>
                    </a-col>
                    <a-col :span="16" class="mt-3">Shadow</a-col>
                </a-row>
                <a-row v-if="styleData.styles.shadow" class="shadow_styles_input mb-2" :gutter="8">
                    <!-- <a-col :span="4" class="mt-2"> </a-col> -->
                    <a-col :span="6" class="mt-2">
                        <a-input-number v-model="styleData.styles.shadowX" size="mini" />
                    </a-col>
                    <a-col :span="6" class="mt-2">
                        <a-input-number v-model="styleData.styles.shadowY" size="mini" />
                    </a-col>
                    <a-col :span="6" class="mt-2">
                        <a-input-number v-model="styleData.styles.shadowBlur" size="mini" />
                    </a-col>
                    <a-col :span="6" class="mt-2">
                        <a-input-number v-model="styleData.styles.shadowSpread" size="mini" />
                    </a-col>
                </a-row>
            </a-collapse-item>
            <!-- 填充样式结束 -->

            <!-- 文本样式开始 -->
            <a-collapse-item v-if="styleData.fontStyle && showText" header="Text" key="3">
                <a-row :gutter="8">
                    <a-col :span="3">
                        <a-color-picker showPreset v-model="styleData.fontStyle.color">
                            <a-tag :color="styleData.fontStyle.color" class="tag_mini"> </a-tag>
                        </a-color-picker>
                    </a-col>
                    <a-col :span="8">
                        <a-select
                            v-model="styleData.fontStyle.fontSize"
                            style="flex: 1"
                            size="small"
                        >
                            <a-option v-for="item in 100" :key="item" :value="item">{{
                                item
                            }}</a-option>
                        </a-select>
                    </a-col>
                    <a-col :span="13">
                        <a-select
                            v-model="styleData.fontStyle.fontFamily"
                            size="small"
                            style="flex: 1"
                        >
                            <a-option value="inherit">Inherit</a-option>
                            <a-option value="alipuhui">阿里普惠</a-option>
                            <a-option value="alishuhei">阿里数黑</a-option>
                        </a-select>
                    </a-col>
                    <a-col :span="12" class="mt-3">
                        <a-input-number
                            v-model="styleData.fontStyle.lineHeight"
                            size="small"
                            style="width: 100%"
                            ><template #prepend
                                ><span style="font-size: 11px">行高</span></template
                            ></a-input-number
                        >
                    </a-col>
                    <a-col :span="12" class="mt-3">
                        <a-button-group size="small" style="width: 100%">
                            <a-button style="width: 33px">
                                <template #icon
                                    ><v-icon icon="mdi-format-bold" size="mall"
                                /></template>
                            </a-button>
                            <a-button style="width: 33px">
                                <template #icon
                                    ><v-icon icon="mdi-format-underline" size="mall"
                                /></template>
                            </a-button>
                            <a-button style="width: 33px">
                                <template #icon
                                    ><v-icon icon="mdi-format-strikethrough" size="mall"
                                /></template> </a-button
                        ></a-button-group>
                    </a-col>
                    <a-col :span="19" class="mt-3">
                        <a-radio-group
                            type="button"
                            size="small"
                            v-model="styleData.fontStyle.textAlign"
                        >
                            <a-radio value="left"
                                ><v-icon icon="mdi-format-align-left" size="x-mall"
                            /></a-radio>
                            <a-radio value="right"
                                ><v-icon icon="mdi-format-align-right" size="x-mall"
                            /></a-radio>
                            <a-radio value="center"
                                ><v-icon icon="mdi-format-align-center" size="x-mall"
                            /></a-radio>
                            <a-radio value="justify"
                                ><v-icon icon="mdi-format-align-justify" size="x-mall"
                            /></a-radio>
                        </a-radio-group>
                    </a-col>
                </a-row>
                <a-row :gutter="8">
                    <a-col :span="4" class="mt-3 pt-1">
                        <a-checkbox v-model="styleData.fontStyle.shadow"
                    /></a-col>
                    <a-col :span="3" class="mt-3">
                        <a-color-picker showPreset v-model="styleData.fontStyle.shadowColor">
                            <a-tag :color="styleData.fontStyle.shadowColor"> </a-tag>
                        </a-color-picker>
                    </a-col>
                    <a-col :span="16" class="mt-3">Shadow</a-col>
                </a-row>
                <a-row v-if="styleData.fontStyle.shadow" :gutter="8" class="shadow_styles_input">
                    <a-col :span="4" class="mt-2"></a-col>
                    <a-col :span="6" class="mt-2">
                        <a-input-number v-model="styleData.fontStyle.shadowX" size="mini" />
                    </a-col>
                    <a-col :span="7" class="mt-2">
                        <a-input-number v-model="styleData.fontStyle.shadowY" size="mini" />
                    </a-col>
                    <a-col :span="7" class="mt-2">
                        <a-input-number v-model="styleData.fontStyle.shadowBlur" size="mini" />
                    </a-col>
                </a-row>
                <a-row :gutter="8" v-if="props.data">
                    <textarea v-model="props.data.label" class="mt-3 p-2 border" style="width: 100%" rows="4"></textarea>
                </a-row>
            </a-collapse-item>
            <!-- 文本样式结束 -->
            <!-- 图片样式开始 -->
            <a-collapse-item v-if="showImage" header="Image" key="4">
                <a-image
                    :preview="false"
                    :width="216"
                    :height="167"
                    fit="contain"
                    :src="styleData?.url || undefined"
                    @click="onImage"
                    style="cursor: pointer"
                />
                <a-row :gutter="8" class="mt-3">
                    <a-col :span="6">Img Fit</a-col>
                    <a-col :span="18">
                        <a-select v-model="styleData.styles.imgFit" size="mini" style="flex: 1">
                            <a-option value="contain">Contain</a-option>
                            <a-option value="cover">Cover</a-option>
                            <a-option value="fill">Fill</a-option>
                            <a-option value="scale-down">Scale down</a-option>
                            <a-option value="none">None</a-option>
                        </a-select>
                    </a-col>
                </a-row>
            </a-collapse-item>
            <!-- 图片样式结束 -->

            <!-- 图标样式开始 -->
            <a-collapse-item v-if="showTmp" header="Post" key="5">
                <Find @choose="onChoose" />
            </a-collapse-item>
        </a-collapse>
    </div>
</template>
<script lang="ts" setup>
import { computed } from 'vue';
import type { VirtualDom } from '../hooks/enumTypes';
import { VirtualDomType } from '../hooks/enumTypes';
import type { AlignFun } from '../hooks/useAlign';
import Find from "@/components/Find/index.vue";

const props = withDefaults(
    defineProps<{
        data?: VirtualDom;
        pageData: VirtualDom;
        align: AlignFun;
    }>(),
    {}
);
const emit = defineEmits(['add-widget', 'image', 'post']);
const styleData = computed(() => {
    if (props.data) {
        return props.data;
    }
    return props.pageData;
});

const showExterior = computed(() => {
    if (props.data && props.data.type === VirtualDomType.Group) return false;
    if (props.data && props.data.type === VirtualDomType.Image) return false;
    if (props.data && props.data.type === VirtualDomType.Text) return false;
    return true;
});

const showTmp = computed(() => {
    if (props.data && props.data.type === VirtualDomType.Group) return true;
    return false;
});

const showImage = computed(() => {
    if (props.data && props.data.type === VirtualDomType.Image) return true;
    return false;
});

const showText = computed(() => {
    if (props.data && props.data.type === VirtualDomType.Icon) return true;
    if (props.data && props.data.type === VirtualDomType.Text) return true;
    return false;
});

const onImage = () => {
    emit('image');
};

const onChoose = (item: any) => {
    console.log(props.data, item);
    emit('post', item);
}
</script>
