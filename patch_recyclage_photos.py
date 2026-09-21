#!/usr/bin/env python3
# -*- coding: utf-8 -*-
# BUG : une fois toutes les photos utilisees une fois, _used.size restait fige
# (rien n'est ajoute a _used dans ce cas) -> la meme photo (index 0) etait
# renvoyee pour TOUS les emplacements restants. Correctif : compteur de
# rotation dedie, qui tourne vraiment entre toutes les photos.
PATH='public/index.html'
with open(PATH,'r') as f: c=f.read()
orig=len(c); report=[]

old = """  function _take(prefOrder){
    for(const o of prefOrder){const pool=_pools[o]||[];for(const idx of pool){if(!_used.has(idx)){_used.add(idx);return idx;}}}
    // fallback : n'importe quelle photo non utilisée
    for(let k=0;k<S.photos.length;k++){if(!_used.has(k)){_used.add(k);return k;}}
    // tout utilisé : recycler dans l'ordre
    return _used.size%Math.max(1,S.photos.length);
  }"""

new = """  let _recycleCounter = 0;
  function _take(prefOrder){
    for(const o of prefOrder){const pool=_pools[o]||[];for(const idx of pool){if(!_used.has(idx)){_used.add(idx);return idx;}}}
    // fallback : n'importe quelle photo non utilisée
    for(let k=0;k<S.photos.length;k++){if(!_used.has(k)){_used.add(k);return k;}}
    // tout utilisé : recycler en tournant vraiment entre toutes les photos (jamais bloqué sur une seule)
    if(S.photos.length===0) return 0;
    const idx = _recycleCounter % S.photos.length;
    _recycleCounter++;
    return idx;
  }"""

if old in c:
    c=c.replace(old,new,1); report.append('Rotation reelle du recyclage photos: OK')
else:
    report.append('Bloc _take: NON TROUVE')

with open(PATH,'w') as f: f.write(c)
print('\n'.join(report))
print(f'Taille: {orig} -> {len(c)}')
print('TOUT OK' if 'NON TROUVE' not in '\n'.join(report) else 'ECHEC')
