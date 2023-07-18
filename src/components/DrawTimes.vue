<script setup lang="ts">
import { ref } from 'vue';
import { useListNamesStore } from '../stores/names';

interface Team {
  members: string[];
}

const ListNamesStore = useListNamesStore();
const allNames = ListNamesStore.ListNames

const Times = ref<Team[]>([])
const CountTimes = 2

const TeamDraw = () => {
    const MaxMembersPerTeam = allNames.length / 2

    Times.value = [];

    for (let index = 0; index < CountTimes; index++) {
        Times.value[index] = {members: []};
    }
    allNames.forEach(item => {        
        const teamSelectedIndex = TeamIndexDraw();
        
        if(Times.value[teamSelectedIndex].members.length >= MaxMembersPerTeam) SelectOtherTeam(item, teamSelectedIndex)
        else AddMemberToTeam(item, Times.value[teamSelectedIndex])
    })    
}

// To do
const TeamIndexDraw = ():number => {
    let MaximunIndexTeam = CountTimes - 1    
    return Math.floor((Math.random()) * (MaximunIndexTeam + MaximunIndexTeam )) ;
}
const SelectOtherTeam = (member:string, teamSelectedIndex:number) => {
    // To do
    let newTeamIndex = teamSelectedIndex
    while(newTeamIndex === teamSelectedIndex) {
        newTeamIndex = TeamIndexDraw()
    }
    
    AddMemberToTeam(member, Times.value[newTeamIndex])
}

const AddMemberToTeam = (member:string, teamSelected:Team) => {
    teamSelected.members.push(member)
}


</script>
<template>
    <div>
        <div class="fields">
            <button @click="TeamDraw">Draw Times</button>
        </div>
        <div class="filled-names" v-if="Times.length > 0">
            <div class="name" v-for="(team, index) in Times" v-bind:key="index">
                Time {{ index + 1 }} :
                <div class="name" v-for="(member, index) in team.members" v-bind:key="index">
                    <span>{{ member }}</span>
                </div>
            </div>
        </div>
    </div>
</template>