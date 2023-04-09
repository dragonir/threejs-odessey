/* eslint-disable */
import { Vector3 } from 'three';

export const rooms = [
  {
    name: '客厅',
    key: 'living-room',
    map: new URL('@/assets/images/map/map_living_room.jpg', import.meta.url).href,
    showSwitch: true,
    position: new Vector3(0, 0, 0),
    interactivePoints: [
      {
        key: 'tv',
        value: '电视机',
        description: '智能电视',
        cover: new URL('@/assets/images/home/cover_living_room_tv.png', import.meta.url).href,
        position: new Vector3(-6, 2, -8),
      },
      {
        key: 'fridge',
        value: '冰箱',
        description: '豪华冰箱',
        cover: new URL('@/assets/images/home/cover_living_room_fridge.png', import.meta.url).href,
        position: new Vector3(-12, 4, 9),
      },
      {
        key: 'sofa',
        value: '沙发',
        description: '舒适沙发',
        cover: new URL('@/assets/images/home/cover_living_room_sofa.png', import.meta.url).href,
        position: new Vector3(6, 0, -8),
      },
    ],
  },
  {
    name: '卧室',
    key: 'bed-room',
    map: new URL('@/assets/images/map/map_bed_room.jpg', import.meta.url).href,
    showSwitch: true,
    position: new Vector3(-32, 0, 0),
    interactivePoints: [
      {
        key: 'bed',
        value: '床',
        description: '温暖的床',
        cover: new URL('@/assets/images/home/cover_bed_room_bed.png', import.meta.url).href,
        position: new Vector3(-38, 2, -14),
      },
    ],
  },
  {
    name: '书房',
    key: 'study-room',
    map: new URL('@/assets/images/map/map_study_room.jpg', import.meta.url).href,
    showSwitch: true,
    position: new Vector3(32, 0, 0),
    interactivePoints: [
      {
        key: 'art',
        value: '艺术品',
        description: '绝版作品',
        cover: new URL('@/assets/images/home/cover_study_room_art.png', import.meta.url).href,
        position: new Vector3(42, 6, -8),
      },
    ]
  },
];
