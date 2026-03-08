# Guía de Diseño — Módulo Teacher (SGRA)

> Documento de referencia para refactorizar o crear nuevos componentes del módulo docente manteniendo coherencia visual total.

---

## 1. Stack tecnológico

- **Framework**: Angular 17+ (standalone components, signals, `@if` / `@for` control flow)
- **CSS Framework**: Bootstrap 5 (clases utilitarias)
- **Iconos**: Bootstrap Icons (`bi bi-*`) — importados via CDN o ng-bootstrap
- **Gráficos**: `ng2-charts` + `Chart.js` (para `baseChart`)
- **Fuente**: `'Inter', 'Segoe UI', -apple-system, BlinkMacSystemFont, sans-serif`

---

## 2. Tokens de diseño (CSS Variables)

Todos los componentes deben declarar en `:host`:
```css
font-family: var(--t-font, 'Inter', 'Segoe UI', sans-serif);
font-size: var(--t-base);
color: var(--t-body);
```

### Variables globales del módulo teacher

| Variable         | Valor sugerido          | Uso                                     |
|-----------------|-------------------------|-----------------------------------------|
| `--t-font`       | `'Inter', 'Segoe UI'`   | Fuente base                             |
| `--t-accent`     | `#1B7505`               | Verde primario (botones, íconos, active)|
| `--t-accent-dark`| `#145904`               | Verde oscuro (hover, borde)             |
| `--t-heading`    | `#111827`               | Títulos y negrita                       |
| `--t-body`       | `#374151`               | Texto cuerpo                            |
| `--t-muted`      | `#6B7280`               | Texto secundario / etiquetas            |
| `--t-base`       | `0.875rem` (14px)       | Tamaño base                             |
| `--t-xs`         | `0.75rem` (12px)        | Etiquetas, chips, badges                |
| `--t-sm`         | `0.8125rem` (13px)      | Texto tabla, meta info                  |
| `--t-md`         | `0.9375rem` (15px)      | Nombres en tarjetas                     |
| `--t-lg`         | `1.125rem` (18px)       | Valores stat medianos                   |
| `--t-xl`         | `1.25rem` (20px)        | Íconos de header                        |
| `--t-stat`       | `1.5rem` (24px)         | Números grandes en chips/stat cards     |
| `--t-normal`     | `400`                   | Peso normal                             |
| `--t-medium`     | `500`                   | Peso medio                              |
| `--t-semi`       | `600`                   | Peso semibold                           |
| `--t-bold`       | `700`                   | Peso bold                               |

---

## 3. Layout principal (`teacher-layout`)

### Sidebar

```
Ancho expandido : 15rem (240px)
Ancho colapsado : 4.5rem (72px)
Color fondo     : #1B7505 (verde)
Posición        : fixed, top:0, left:0, height:100vh
z-index         : 20
Transición      : width/min-width/max-width 0.35s cubic-bezier(.4,0,.2,1)
Overflow        : hidden
Border-right    : 1px solid rgba(0,0,0,0.15)
```

**Header del sidebar:**
```html
<div class="sidebar-header text-center border-bottom border-light border-opacity-25">
  <i class="bi bi-mortarboard-fill display-6 mb-2"></i>
  <h6 class="m-0 fw-bold sidebar-label titulo">SGRA</h6>
</div>
```
- padding: `0.9rem 0.5rem`
- `.titulo`: padding-left 0.8rem, font-size 1.4rem

**Ítems de navegación:**
```html
<a routerLink="..." routerLinkActive="active-link"
   class="nav-link text-white d-flex align-items-center"
   [class.justify-content-center]="sidebarCollapsed">
  <i class="bi bi-[icono] nav-icon" [class.me-2]="!sidebarCollapsed"></i>
  <span class="sidebar-label">Etiqueta</span>
</a>
```
- `.nav-link`: border-radius 0.5rem, padding `0.625rem 0.9375rem`, font-size 0.9rem, opacity 0.85
- `:hover`: `rgba(255,255,255,0.15)`, transform translateX(0.25rem), opacity 1
- `.active-link`: background `#124d1c`, font-weight 600, border-left `4px solid #fff`, border-radius `4px 8px 8px 4px`
- `.sidebar-label`: transición max-width + opacity; colapsado → max-width 0, opacity 0
- `.nav-icon`: transition margin 0.3s; colapsado → margin-right 0

**Mapa de iconos por sección:**

| Ruta              | Ícono Bootstrap Icons         |
|-------------------|-------------------------------|
| Dashboard         | `bi-speedometer2`             |
| Solicitudes       | `bi-inbox-fill`               |
| Aula Virtual      | `bi-easel2-fill`              |
| Preferencias      | `bi-sliders`                  |

**Botón toggle sidebar:**
```css
position: fixed;
top: 4.8rem;          /* alineado al borde del header */
transform: translateY(-50%);
width: 26px; height: 26px; border-radius: 50%;
border: 2px solid rgba(255,255,255,0.7);
background: #1B7505; color: #fff;
transition: left 0.35s cubic-bezier(.4,0,.2,1);
z-index: 100;
box-shadow: 0 2px 6px rgba(0,0,0,0.3);
```
- `left` cuando expandido: `calc(15rem - 13px)`
- `left` cuando colapsado: `calc(4.5rem - 13px)`
- El botón está **fuera del `<aside>`** para no ser cortado por `overflow:hidden`
- Ícono: `bi-chevron-left` (expandido) / `bi-chevron-right` (colapsado)

### Content area

```css
margin-left: 15rem;  /* expandido */
margin-left: 4.5rem; /* colapsado (.sidebar-collapsed) */
transition: margin-left 0.35s cubic-bezier(.4,0,.2,1);
```

### Top Header

```html
<header class="top-header bg-white shadow-sm p-3 d-flex justify-content-between align-items-center z-1">
```
- `border-bottom: 1px solid #e0e0e0`
- `position: relative; overflow: visible; z-index: 20`

**Avatar del docente:**
```css
width: 36px; height: 36px;
background-color: #1B7505;
font-size: 0.8rem;
border: 2px solid #e8f5e9;
border-radius: 50%;
```

**Profile dropdown:**
```css
position: absolute; top: calc(100% + 8px); right: 0;
min-width: 260px; background: #fff; border-radius: 10px;
z-index: 1050;
```
- Ítem normal: `hover → background #fff5f5`
- Ítem cerrar sesión: `text-danger`, icono `bi-door-open`
- Cambiar contraseña: icono `bi-shield-lock`
- Backdrop: `position:fixed; inset:0; z-index:1040`

---

## 4. Patrón de página (Header de sección)

**Todos los componentes del módulo** inician con este bloque:

```html
<div class="container-fluid">
  <div class="mb-4">
    <div class="d-flex align-items-center gap-3">
      <div class="header-icon">
        <i class="bi bi-[icono-seccion]"></i>
      </div>
      <div>
        <h3 class="fw-bold text-dark mb-0">Título de Sección</h3>
        <p class="text-muted mb-0">Descripción breve de la sección</p>
      </div>
    </div>
  </div>
  <!-- contenido -->
</div>
```

**`.header-icon`:**
```css
width: 48px; height: 48px; min-width: 48px;
border-radius: 14px;
background: var(--t-accent); /* #1B7505 */
color: #fff;
display: flex; align-items: center; justify-content: center;
font-size: var(--t-xl);   /* 1.25rem */
border: 1px solid #145904;
```

**Íconos por sección:**

| Sección           | Ícono                  |
|-------------------|------------------------|
| Dashboard         | `bi-speedometer2`      |
| Solicitudes       | `bi-inbox-fill`        |
| Aula Virtual      | `bi-easel2-fill`       |
| Preferencias      | `bi-sliders`           |

---

## 5. Chips de resumen (Summary chips)

Aparecen en la parte superior de todas las páginas de contenido.

```html
<div class="row g-2 mb-3">
  <div class="col-6 col-lg-3">
    <div class="chip-box bg-white shadow-sm rounded-3 p-3
                d-flex justify-content-between align-items-center">
      <div>
        <div class="text-muted small">Etiqueta</div>
        <div class="fw-bold fs-4" [style.color]="color">{{ valor }}</div>
      </div>
      <div class="chip-icon d-flex align-items-center justify-content-center rounded-circle"
           [style.background-color]="bgSuave">
        <i class="bi bi-[icono]" [style.color]="color"></i>
      </div>
    </div>
  </div>
</div>
```

**`.chip-box`:** `min-height: 72px; border: 1px solid #e0e0e0 !important;`
**`.chip-icon`:** `width: 40px; height: 40px; min-width: 40px; font-size: 1.05rem;`

**Paleta de colores para chips:**

| Concepto          | Color texto  | Bg suave   | Ícono sugerido            |
|-------------------|-------------|------------|---------------------------|
| Sesiones/Verde    | `#1B7505`   | `#e8f5e9`  | `bi-easel2-fill`          |
| Virtuales/Azul    | `#0288d1`   | `#e1f5fe`  | `bi-camera-video-fill`    |
| Presenciales/Morado | `#7b1fa2` | `#f3e5f5`  | `bi-building-fill`        |
| Pendientes/Naranja| `#E65100`   | `#FFF3E0`  | `bi-hourglass-split`      |
| Aceptadas/Verde   | `#1B7505`   | `#E8F5E9`  | `bi-check-circle-fill`    |
| Rechazadas/Rojo   | `#C62828`   | `#FFEBEE`  | `bi-x-circle-fill`        |
| Completadas/Azul  | `#1565C0`   | `#E3F2FD`  | `bi-clock-history`        |
| Canal (preferencias) | `#1B7505` | `#e8f5e9`  | `bi-broadcast-pin`       |
| Anticipación      | `#1565C0`   | `#e3f2fd`  | `bi-stopwatch`            |

---

## 6. Tarjetas de contenido (Cards)

```css
.card {
  border-radius: 14px;
}
.card-header {
  border-radius: 14px 14px 0 0 !important;
  font-size: var(--t-sm);
  font-weight: var(--t-semi);
}
.card-footer {
  border-radius: 0 0 14px 14px !important;
  font-size: var(--t-xs);
}
```

**Card header estándar:**
```html
<div class="card-header bg-white border-bottom d-flex align-items-center gap-2 py-3 px-4">
  <i class="bi bi-[icono] text-success fs-5"></i>
  <span class="fw-semibold small">Título</span>
  <!-- Opcional: badge contador -->
  <span class="badge bg-success ms-auto">{{ count }}</span>
</div>
```

**Stat cards (dashboard):**
```css
.stat-card {
  border-radius: 14px;
  border: 1px solid #e8e8e8 !important;
  transition: transform .18s, box-shadow .18s;
  cursor: pointer;
}
.stat-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 22px rgba(0,0,0,.08) !important;
}
```

```html
<div class="stat-card card border-0 shadow-sm h-100" (click)="navigateTo(ruta)">
  <div class="card-body p-3 p-md-4">
    <div class="d-flex justify-content-between align-items-start">
      <div>
        <p class="stat-label text-muted mb-1">Etiqueta</p>
        <h2 class="stat-value fw-bold mb-0 text-[color]">{{ valor }}</h2>
      </div>
      <div class="stat-icon-circle bg-[color]-soft">
        <i class="bi bi-[icono] text-[color]"></i>
      </div>
    </div>
  </div>
</div>
```

```css
.stat-label { font-size: var(--t-xs); font-weight: var(--t-medium); letter-spacing:.03em; text-transform:uppercase; }
.stat-value { font-size: var(--t-stat); font-weight: var(--t-bold); line-height:1.15; letter-spacing:-.02em; }
.stat-icon-circle { width:46px; height:46px; border-radius:50%; display:flex; align-items:center; justify-content:center; font-size:1.2rem; }
```

---

## 7. Tarjetas de ítem (req-card / sess-card)

**req-card** (solicitudes e historial):
```css
.req-card {
  background: #fff;
  border: 1px solid #e8ecef;
  border-radius: .75rem;
  padding: 1.25rem 1.5rem;
  cursor: pointer;
  transition: transform .15s ease, box-shadow .15s ease;
}
.req-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 16px rgba(0,0,0,.08);
}
```

**sess-card** (sesiones activas en Aula Virtual):
```css
.sess-card {
  background: #fff;
  border: 1px solid #e8ecef;
  border-radius: .75rem;
  padding: 1.25rem 1.5rem;
  transition: box-shadow .15s ease, border-color .15s ease;
}
.sess-card:hover {
  box-shadow: 0 4px 14px rgba(0,0,0,.08);
  border-color: #c8d8c0;
}
```

**Estructura interna de una tarjeta de ítem:**
```html
<article class="req-card">
  <!-- 1. Top row: tipo sesión (badge) + fecha -->
  <div class="d-flex justify-content-between align-items-center mb-3">
    <span class="req-badge req-badge--[individual|grupal]">
      <i class="bi bi-[icono] me-1"></i>Tipo
    </span>
    <small class="text-muted">
      <i class="bi bi-calendar3 me-1"></i>{{ fecha | date:'yyyy-MM-dd' }}
    </small>
  </div>

  <!-- 2. Nombre principal (estudiante / asignatura) -->
  <h6 class="fw-bold text-dark mb-1">
    <i class="bi bi-person-vcard-fill me-2" style="color:#1B7505"></i>Nombre
  </h6>

  <!-- 3. Línea secundaria (asignatura / horario) -->
  <div class="text-muted small mb-3">
    <i class="bi bi-book-half me-2"></i>Asignatura
  </div>

  <!-- 4. Motivo / meta (opcional, truncado) -->
  <div class="text-muted small mb-3 text-truncate">
    <i class="bi bi-chat-quote me-2"></i>Texto corto
  </div>

  <!-- 5. Estado + contador participantes -->
  <div class="d-flex align-items-center justify-content-between">
    <span class="badge rounded-pill">Estado</span>
    <small class="text-muted"><i class="bi bi-people me-1"></i>N participantes</small>
  </div>

  <!-- 6. Footer: ref # + botones de acción -->
  <div class="req-footer">
    <small class="text-muted"><i class="bi bi-hash me-1"></i>Ref. #ID</small>
    <div class="d-flex gap-2 flex-wrap">
      <!-- botones -->
    </div>
  </div>
</article>
```

**`.req-footer`:**
```css
display: flex; justify-content: space-between; align-items: center;
margin-top: .85rem; padding-top: .85rem;
border-top: 1px solid #f0f0f0;
```

---

## 8. Badges de estado y tipo

### Tipos de sesión

```css
.req-badge { display:inline-flex; align-items:center; font-size:var(--t-xs); font-weight:var(--t-semi); padding:3px 11px; border-radius:999px; letter-spacing:.01em; }
.req-badge--individual { background:#e0f4f8; color:#0891b2; border:1px solid #a5d8e8; }
.req-badge--grupal     { background:#e0e7ff; color:#4338ca; border:1px solid #c7d2fe; }
```

### Modalidad

```css
.sess-badge--virtual    { background:#e1f5fe; color:#0288d1; border:1px solid #81d4fa; }
.sess-badge--presencial { background:#f3e5f5; color:#7b1fa2; border:1px solid #ce93d8; }
```

### Estados de solicitud (badge rounded-pill)

| Estado        | Clase Bootstrap               |
|---------------|-------------------------------|
| Pendiente     | `bg-warning text-dark`        |
| Aceptada      | `bg-success`                  |
| Rechazada     | `bg-danger`                   |
| Cancelada     | `bg-secondary`                |
| Completada    | `bg-primary`                  |

### Estados de sesión programada (colores inline)

| Estado            | Color texto  | Bg     |
|-------------------|-------------|--------|
| Programado        | `#1B7505`   | `#e8f5e9` |
| Espera espacio    | `#E65100`   | `#FFF3E0` |
| Reprogramado      | `#1565C0`   | `#E3F2FD` |
| Finalizado        | `#1B7505`   | `#e8f5e9` |

---

## 9. Filtros por estado / modalidad

Patrón idéntico en todas las páginas (una sola fila):

```html
<div class="d-flex flex-wrap gap-2 align-items-center justify-content-between mb-4">
  <!-- Filtros a la izquierda -->
  <div class="d-flex flex-wrap gap-2 align-items-center">
    <span class="small fw-semibold text-muted me-1">
      <i class="bi bi-funnel me-1"></i>Filtrar por estado:
    </span>
    <button class="filter-tag" [class.filter-tag--active]="filtro === null" (click)="...">
      <i class="bi bi-grid-fill me-1"></i>Todos
      <span class="filter-tag__count">{{ total }}</span>
    </button>
    <button class="filter-tag" [class.filter-tag--active]="filtro === 1" (click)="...">
      <i class="bi bi-hourglass-split me-1"></i>Pendiente
    </button>
    <!-- ... más filtros -->
  </div>

  <!-- Layout toggle a la derecha -->
  <div class="d-flex gap-1 flex-shrink-0">
    <button class="btn btn-sm border" [ngClass]="colClass==='col-12' ? 'btn-secondary':'btn-outline-secondary'"
            title="1 columna" (click)="colClass='col-12'">
      <i class="bi bi-view-list"></i>
    </button>
    <button class="btn btn-sm border" [ngClass]="colClass==='col-12 col-md-6' ? 'btn-secondary':'btn-outline-secondary'"
            title="2 columnas" (click)="colClass='col-12 col-md-6'">
      <i class="bi bi-grid"></i>
    </button>
    <button class="btn btn-sm border" [ngClass]="colClass==='col-12 col-md-4' ? 'btn-secondary':'btn-outline-secondary'"
            title="3 columnas" (click)="colClass='col-12 col-md-4'">
      <i class="bi bi-grid-3x3-gap"></i>
    </button>
  </div>
</div>
```

**Separador entre grupos de filtros:**
```html
<span class="filter-divider"></span>
```
```css
.filter-divider { display:inline-block; width:1px; height:22px; background:#dee2e6; margin:0 .25rem; align-self:center; }
```

**Estilos `.filter-tag`:**
```css
.filter-tag {
  display: inline-flex; align-items: center; gap: .3rem;
  padding: .35rem .85rem; border-radius: 999px;
  font-size: var(--t-sm); font-weight: var(--t-semi);
  border: 1.5px solid #dee2e6; background: #fff; color: var(--t-body);
  cursor: pointer;
  transition: border-color .15s, background .15s, color .15s;
  white-space: nowrap; line-height: 1.4;
}
.filter-tag:hover        { border-color: #adb5bd; background: #f8f9fa; }
.filter-tag--active      { background: var(--t-accent) !important; border-color: var(--t-accent) !important; color: #fff !important; }
.filter-tag__count {
  display: inline-flex; align-items: center; justify-content: center;
  background: #e9ecef; color: var(--t-body); border-radius: 999px;
  font-size: .65rem; font-weight: var(--t-bold);
  padding: 0 .4rem; min-width: 1.15rem; height: 1.15rem; margin-left: .2rem;
  transition: background .15s, color .15s;
}
.filter-tag--active .filter-tag__count { background: rgba(255,255,255,.3); color: #fff; }
```

---

## 10. Modales

**Todos los modales siguen la misma estructura:**

```html
<div class="modal fade show d-block" tabindex="-1" style="background:rgba(0,0,0,.5)">
  <div class="modal-dialog modal-dialog-centered [modal-lg|modal-xl]">
    <div class="modal-content border">

      <!-- Header -->
      <div class="modal-header border-bottom">
        <div class="d-flex align-items-center gap-3">
          <div class="modal-icon bg-[color]-subtle text-[color]">
            <i class="bi bi-[icono]"></i>
          </div>
          <div>
            <h5 class="modal-title fw-bold mb-0">
              Título Modal
              <span class="text-muted fw-normal fs-6 ms-2">#{{ id }}</span>
            </h5>
            <small class="text-muted">Subtítulo / asignatura</small>
          </div>
        </div>
        <button class="btn-close ms-auto" (click)="closeModal()"></button>
      </div>

      <!-- Body -->
      <div class="modal-body">
        <!-- Campos en grid -->
        <div class="row g-3">
          <div class="col-6">
            <span class="label">Etiqueta campo</span>
            <strong class="d-block">Valor</strong>
          </div>
        </div>
      </div>

      <!-- Footer -->
      <div class="modal-footer border-top">
        <button class="btn btn-outline-secondary" (click)="closeModal()">Cancelar</button>
        <button class="btn btn-success" (click)="submit()">
          <i class="bi bi-floppy-fill me-1"></i>Guardar
        </button>
      </div>

    </div>
  </div>
</div>
```

**`.modal-icon`:**
```css
width: 38px; height: 38px; min-width: 38px; /* o 48px para modales de acción */
border-radius: 10px;  /* o 50% para íconos circulares de stat */
display: flex; align-items: center; justify-content: center;
font-size: 1.1rem;
```

**`.label` (etiquetas de campo dentro de modales):**
```css
.label {
  color: var(--t-muted);
  font-size: var(--t-xs);
  font-weight: var(--t-medium);
  display: block;
  margin-bottom: 2px;
  letter-spacing: .01em;
}
```

**Colores de modal-icon por tipo:**

| Tipo de modal     | Clase bg / color                          | Ícono                      |
|-------------------|-------------------------------------------|----------------------------|
| Ver detalle       | `bg-secondary-subtle text-secondary`     | `bi-file-earmark-person-fill` |
| Sesión activa     | `bg-primary-subtle text-primary`         | `bi-easel2-fill`           |
| Aceptar/Reprogramar | `bg-success-subtle text-success`       | `bi-calendar2-check-fill`  |
| Rechazar          | `bg-danger-subtle text-danger`           | `bi-x-circle-fill`         |
| Cancelar          | `bg-danger-subtle text-danger`           | `bi-ban`                   |
| Resultado         | `bg-success-subtle text-success`         | `bi-journal-plus`          |
| Historial detalle | `bg-success-subtle text-success`         | `bi-clock-history`         |
| Asistencia        | `bg-primary-subtle text-primary`         | `bi-person-check-fill`     |

### Modal de detalle de sesión completada (historial)

Modal especial con scroll y doble panel (detalle + asistencia lateral):

```html
<!-- Wrapper externo: flex, centrado, sin modal-dialog Bootstrap -->
<div style="background:rgba(0,0,0,.5);display:flex!important;
            align-items:center;justify-content:center;padding:1.5rem"
     class="modal fade show d-block" tabindex="-1">
  <div style="display:flex;flex-wrap:wrap;gap:1rem;
              justify-content:center;align-items:flex-start;
              width:100%;max-width:700px">
    <div class="modal-content border d-flex flex-column"
         style="width:100%;max-height:85vh">
      <!-- header / body / footer con overflow-auto en el body -->
    </div>
  </div>
</div>
```

Secciones del body del modal de historial (en orden):
1. **Información principal** — grid `row g-3` con `col-6` para cada campo
2. **Separador `<hr class="my-3">`**
3. **Observaciones** — bloque con `.label` + párrafo
4. **Enlace virtual** (si existe) — link con `bi-link-45deg`
5. **Participantes** — lista con avatar circular + badge asistencia
6. **Recursos adjuntos** (si existen) — list-group con links

---

## 11. Avatar circular con inicial

```html
<div class="hist-avatar flex-shrink-0"
     [style.background]="p.attended ? '#1B7505' : '#9e9e9e'">
  {{ p.studentName.charAt(0).toUpperCase() }}
</div>
```

```css
.hist-avatar {
  width: 36px; height: 36px; min-width: 36px;
  border-radius: 50%;
  display: flex; align-items: center; justify-content: center;
  font-size: .85rem; font-weight: 700;
  color: #fff; line-height: 1; user-select: none;
}
```

---

## 12. Barra de progreso de asistencia

```html
<div class="d-flex align-items-center gap-2 mt-1">
  <div class="progress flex-grow-1" style="height:6px;border-radius:3px">
    <div class="progress-bar"
         [style.width]="pct + '%'"
         [style.background-color]="pctColor(pct)">
    </div>
  </div>
  <strong [style.color]="pctColor(pct)">{{ pct | number:'1.0-1' }}%</strong>
</div>
```

**Función `pctColor(pct)`:**
```typescript
pctColor(pct: number): string {
  if (pct >= 80) return '#1B7505';  // verde
  if (pct >= 50) return '#E65100';  // naranja
  return '#C62828';                  // rojo
}
```

En tarjetas pequeñas usar `height:4px;border-radius:2px`.

---

## 13. Tabla de historial

```css
.history-table thead th {
  background: #f8f9fa;
  border-bottom: 2px solid #e9ecef;
  padding-top: .85rem; padding-bottom: .85rem;
  font-size: var(--t-sm); font-weight: var(--t-semi);
  letter-spacing: .03em; color: var(--t-muted);
}
.history-table tbody tr { transition: background .12s; }
.history-table tbody tr:hover { background: #e8f5e9; }
.history-table tbody td {
  padding-top: .85rem; padding-bottom: .85rem;
  border-bottom: 1px solid #f0f0f0;
  vertical-align: middle;
  font-size: var(--t-sm); color: var(--t-body);
}
```

---

## 14. Paginación

Patrón uniforme al pie de todas las listas:

```html
<div class="d-flex justify-content-between align-items-center mt-3 flex-wrap gap-2">
  <div class="text-muted small">Página {{ page }} de {{ totalPages }} · Total: {{ total }}</div>
  <div class="d-flex gap-2">
    <button class="btn btn-outline-secondary btn-sm border"
            [disabled]="page <= 1" (click)="goTo(page - 1)">
      <i class="bi bi-chevron-left"></i> Anterior
    </button>
    <button class="btn btn-outline-secondary btn-sm border"
            [disabled]="page >= totalPages" (click)="goTo(page + 1)">
      Siguiente <i class="bi bi-chevron-right"></i>
    </button>
  </div>
</div>
```

---

## 15. Spinner de carga

```html
<div class="text-center py-5">
  <div class="spinner-border text-success" role="status"></div>
  <p class="text-muted mt-2 mb-0 small">Cargando...</p>
</div>
```

---

## 16. Estado vacío

```html
<div class="text-center py-5 text-muted">
  <i class="bi bi-[icono-relevante] display-4 d-block mb-2 opacity-25"></i>
  Mensaje descriptivo del estado vacío.
</div>
```

---

## 17. Tabs de navegación interna

Usado en Aula Virtual (sesiones activas / historial):

```html
<ul class="nav nav-tabs mb-4 border-bottom">
  <li class="nav-item">
    <button class="nav-link fw-semibold d-flex align-items-center gap-2"
            [class.active]="activeTab === 'active'"
            (click)="activeTab = 'active'">
      <i class="bi bi-easel2"></i> Sesiones activas
      <span class="badge rounded-pill ms-1"
            [class.bg-success]="activeTab==='active'"
            [class.bg-secondary]="activeTab!=='active'">{{ count }}</span>
    </button>
  </li>
</ul>
```

```css
.nav-tabs .nav-link {
  font-size: var(--t-sm); font-weight: var(--t-semi);
  color: var(--t-muted); border: none;
  border-bottom: 3px solid transparent;
  border-radius: 0; padding: .6rem 1.1rem;
  transition: color .15s, border-color .15s;
}
.nav-tabs .nav-link:hover  { color: var(--t-accent); border-bottom-color: #c8e6c9; }
.nav-tabs .nav-link.active { color: var(--t-accent); border-bottom: 3px solid var(--t-accent);
                              background: transparent; font-weight: var(--t-bold); }
```

---

## 18. Time picker personalizado (accept/reschedule modal)

```html
<div class="time-card-group">
  <div class="time-card" [class.time-card--active]="hour !== null">
    <input type="number" class="time-card-input" [(ngModel)]="hour"
           min="0" max="23" placeholder="--" />
    <span class="time-card-label">HH</span>
  </div>
  <span class="time-card-sep">:</span>
  <div class="time-card">
    <input type="number" class="time-card-input" [(ngModel)]="min"
           min="0" max="45" step="15" placeholder="--" />
    <span class="time-card-label">MM</span>
  </div>
</div>
<i class="bi bi-arrow-right text-secondary fs-5 mt-3"></i>
<!-- repetir para hora fin -->
```

```css
.time-card-group { display:flex; align-items:center; gap:10px; }
.time-card { display:flex; flex-direction:column; align-items:center;
             background:#fff; border:1px solid #dee2e6; border-radius:5px;
             padding:8px 10px 2px; width:40px; }
.time-card--active { border-color:var(--t-accent); box-shadow:0 0 0 1px var(--t-accent); }
.time-card-input { width:40px; border:none; background:transparent; text-align:center;
                   font-size:var(--t-md); color:var(--t-heading); outline:none; line-height:1.4; }
.time-card-label { font-size:.6rem; color:var(--t-muted); margin-top:2px;
                   font-weight:var(--t-medium); letter-spacing:.04em; text-transform:uppercase; }
.time-card-sep { font-size:1.35rem; font-weight:var(--t-bold); color:var(--t-muted); margin-bottom:14px; }
```

---

## 19. Chips de info (hist-chip)

Usados en modales de detalle con fondo gris suave:

```html
<div class="hist-chip">
  <span class="hist-chip__label">Etiqueta</span>
  <strong>Valor</strong>
</div>
```

```css
.hist-chip {
  background: #f8f9fa; border: 1px solid #e9ecef; border-radius: .6rem;
  padding: .65rem .9rem; display: flex; flex-direction: column; gap: .2rem; height: 100%;
}
.hist-chip__label { font-size:var(--t-xs); color:var(--t-muted); font-weight:var(--t-medium); letter-spacing:.01em; }
.hist-chip strong  { font-size:var(--t-sm); color:var(--t-heading); font-weight:var(--t-bold); }
```

---

## 20. Accesos rápidos (Quick Links — Dashboard)

```html
<div class="quick-link-card h-100 p-3 d-flex flex-column gap-2"
     (click)="navigateTo(link.route)" role="button">
  <div class="quick-link-icon" [style.background]="link.bg" [style.color]="link.accent">
    <i class="bi {{ link.icon }} fs-5"></i>
  </div>
  <div class="flex-grow-1">
    <p class="fw-semibold mb-0 small" [style.color]="link.accent">{{ link.label }}</p>
    <p class="text-muted mb-0" style="font-size:.72rem;line-height:1.3">{{ link.desc }}</p>
  </div>
  <div class="d-flex justify-content-end">
    <i class="bi bi-arrow-right-circle-fill" [style.color]="link.accent" style="font-size:.95rem;opacity:.7"></i>
  </div>
</div>
```

```css
.quick-link-card {
  border-radius: 12px; border: 1.5px solid #ebebeb;
  cursor: pointer; background: #fff;
  transition: transform .15s, box-shadow .15s, border-color .15s;
}
.quick-link-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 18px rgba(0,0,0,.08);
  border-color: #c8e6c9;
}
.quick-link-icon {
  width: 42px; height: 42px; min-width: 42px;
  border-radius: 10px; display: flex; align-items: center; justify-content: center;
}
```

**Datos de accesos rápidos:**
```typescript
quickLinks = [
  { label:'Solicitudes', desc:'Gestiona las solicitudes de refuerzo', icon:'bi-inbox-fill',
    route:'/teacher/requests', accent:'#1B7505', bg:'#e8f5e9' },
  { label:'Aula Virtual', desc:'Sesiones activas e historial', icon:'bi-easel2-fill',
    route:'/teacher/history', accent:'#1565C0', bg:'#E3F2FD' },
  { label:'Preferencias', desc:'Canales y recordatorios', icon:'bi-sliders',
    route:'/teacher/preferences', accent:'#7b1fa2', bg:'#f3e5f5' },
];
```

---

## 21. Gráficos (Dashboard)

### Gráfico Donut — Estado de Solicitudes

```html
<div style="position:relative;width:100%;max-width:220px;margin:0 auto">
  <canvas baseChart
          [data]="donutData"
          [options]="donutOptions"
          [plugins]="[donutCenterPlugin]"
          type="doughnut"
          style="display:block;width:100%!important">
  </canvas>
</div>
```

**Plugin de etiqueta central:**
```typescript
donutCenterPlugin = {
  id: 'centerText',
  afterDraw(chart: any) {
    const { ctx, chartArea: { top, bottom, left, right } } = chart;
    const cx = (left + right) / 2;
    const cy = (top + bottom) / 2;
    ctx.save();
    // número total
    ctx.font = 'bold 28px Inter, Segoe UI, sans-serif';
    ctx.fillStyle = '#111827';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(total, cx, cy - 8);
    // etiqueta "Solicitudes"
    ctx.font = '12px Inter, Segoe UI, sans-serif';
    ctx.fillStyle = '#6B7280';
    ctx.fillText('Solicitudes', cx, cy + 12);
    ctx.restore();
  }
};
```

**Colores del donut:**
```typescript
donutData = {
  labels: ['Pendientes', 'Aceptadas', 'Rechazadas', 'Canceladas'],
  datasets: [{
    data: [pending, accepted, rejected, cancelled],
    backgroundColor: ['#E65100','#1B7505','#C62828','#9E9E9E'],
    borderWidth: 2, borderColor: '#fff'
  }]
};
donutOptions = {
  responsive: true, cutout: '70%',
  plugins: { legend: { position: 'bottom', labels: { padding: 16, font: { size: 11 } } }, tooltip: { enabled: true } }
};
```

### Gráfico Barras — Sesiones por semana

```typescript
barData = {
  labels: ['Lun','Mar','Mié','Jue','Vie','Sáb','Dom'],
  datasets: [
    { label: 'Presencial', data: [...], backgroundColor: 'rgba(123,31,162,0.75)', borderRadius: 4 },
    { label: 'Virtual',    data: [...], backgroundColor: 'rgba(2,136,209,0.75)',  borderRadius: 4 }
  ]
};
barOptions = {
  responsive: true,
  plugins: { legend: { position: 'top', labels: { font:{ size:11 } } } },
  scales: { x: { grid:{ display:false } }, y: { beginAtZero:true, ticks:{ stepSize:1 } } }
};
```

---

## 22. Notificaciones toast

Todos los mensajes de éxito / error usan el servicio `ToastService` (módulo shared).

```typescript
// éxito
this.toast.show('Mensaje de éxito', 'success');
// error
this.toast.show('Mensaje de error', 'error');
// info
this.toast.show('Mensaje informativo', 'info');
```

No usar `alert()` ni `window.confirm()`.

---

## 23. Botones estándar del módulo

| Acción              | Clase Bootstrap                    | Ícono                     |
|---------------------|------------------------------------|---------------------------|
| Guardar / Confirmar | `btn btn-success`                  | `bi-floppy-fill`          |
| Aceptar solicitud   | `btn btn-success`                  | `bi-check-circle-fill`    |
| Rechazar            | `btn btn-danger`                   | `bi-x-circle-fill`        |
| Cancelar / Cerrar   | `btn btn-outline-secondary`        | —                         |
| Cancelar sesión     | `btn btn-outline-danger border`    | `bi-ban`                  |
| Reprogramar         | `btn btn-outline-warning border`   | `bi-calendar2-event-fill` |
| Ver detalle         | `btn btn-sm btn-outline-secondary border` | `bi-eye-fill`        |
| Tomar asistencia    | `btn btn-sm btn-outline-primary border`   | `bi-person-check-fill` |
| Finalizar sesión    | `btn btn-success`                  | `bi-stop-circle-fill`     |
| Guardar preferencias| `btn btn-success`                  | `bi-floppy-fill`          |
| Restablecer         | `btn btn-outline-secondary`        | `bi-arrow-counterclockwise` |

---

## 24. Formularios dentro de modales

- Labels: `<label class="form-label fw-semibold small">`
- Inputs: `class="form-control border"`
- Selects: `class="form-select border"`
- Textareas: `class="form-control border" rows="3"`
- Campos requeridos: `<span class="text-danger">*</span>` al lado del label
- Campos opcionales: `<span class="text-muted fw-normal">(opcional)</span>`
- Presets de opción rápida: `btn btn-sm rounded-pill` con `btn-success` (activo) o `btn-outline-secondary` (inactivo)

---

## 25. Reglas tipográficas globales

| Elemento                    | Clase / estilo                                  |
|-----------------------------|--------------------------------------------------|
| Título de sección (h3)      | `fw-bold text-dark mb-0`                        |
| Subtítulo / descripción     | `text-muted mb-0` (párrafo bajo h3)             |
| Título dentro de tarjeta    | `fw-bold text-dark mb-1` (`var(--t-md)`)        |
| Texto secundario / meta     | `text-muted small` (`var(--t-sm)`)              |
| Etiqueta de campo           | `.label` — `var(--t-xs)` muted medium           |
| Valor de campo              | `<strong class="d-block">` — `var(--t-sm)`      |
| Card header                 | `fw-semibold small`                             |
| Número en stat card         | `var(--t-stat)` bold                            |
| Badge / chip texto          | `var(--t-xs)` semi                              |
| Texto de paginación         | `text-muted small`                              |
| Texto de spinner            | `text-muted mt-2 mb-0 small`                    |

---

## 26. Estructura HTML de página completa (plantilla)

```html
<div class="container-fluid">

  <!-- 1. Header de sección -->
  <div class="mb-4">
    <div class="d-flex align-items-center gap-3">
      <div class="header-icon"><i class="bi bi-[icono]"></i></div>
      <div>
        <h3 class="fw-bold text-dark mb-0">Título</h3>
        <p class="text-muted mb-0">Descripción</p>
      </div>
    </div>
  </div>

  <!-- 2. Chips de resumen -->
  <div class="row g-2 mb-3"><!-- chip-boxes --></div>

  <!-- 3. Spinner de carga -->
  @if (loading) {
    <div class="text-center py-5">
      <div class="spinner-border text-success" role="status"></div>
      <p class="text-muted mt-2 mb-0 small">Cargando...</p>
    </div>
  }

  @if (!loading) {
    <!-- 4. Card contenedor principal -->
    <div class="card border shadow-sm">
      <div class="card-body">

        <!-- 5. Barra de filtros + toggle de layout -->
        <div class="d-flex flex-wrap gap-2 align-items-center justify-content-between mb-4">
          <!-- filtros -->
          <!-- layout toggle -->
        </div>

        <!-- 6. Grid de tarjetas -->
        <div class="row g-3">
          @for (item of items; track item.id) {
            <div [ngClass]="colClass">
              <article class="req-card"><!-- contenido --></article>
            </div>
          }
        </div>

        <!-- 7. Paginación -->
        <div class="d-flex justify-content-between align-items-center mt-3 flex-wrap gap-2">
          <!-- ... -->
        </div>

      </div>
    </div>
  }

</div>

<!-- 8. Modales (fuera del contenedor principal) -->
@if (activeModal === 'detail') {
  <!-- modal detail -->
}
```

---

## 27. Resumen de paleta de colores

| Nombre             | Hex       | Uso                                          |
|--------------------|-----------|----------------------------------------------|
| Verde primario     | `#1B7505` | Sidebar bg, accent, botones primary, chips   |
| Verde oscuro       | `#145904` | Hover sidebar, borde header-icon             |
| Verde activo nav   | `#124d1c` | Active nav-link background                   |
| Verde suave        | `#e8f5e9` | Bg chips, hover tabla, bg badges verdes      |
| Azul sesiones      | `#1565C0` | Stat sessions, completadas                   |
| Azul virtual       | `#0288d1` | Virtuales                                    |
| Azul suave         | `#E3F2FD` | Bg chip sesiones, bg badges virtuales        |
| Naranja pendiente  | `#E65100` | Pendientes, "espera espacio"                 |
| Naranja suave      | `#FFF3E0` | Bg chip pendientes                           |
| Rojo rechazado     | `#C62828` | Rechazadas, acciones destructivas            |
| Rojo suave         | `#FFEBEE` | Bg chip rechazadas                           |
| Morado presencial  | `#7b1fa2` | Modalidad presencial                         |
| Morado suave       | `#f3e5f5` | Bg chip presencial                           |
| Gris borde         | `#e8ecef` | Borde tarjetas                               |
| Gris fondo chip    | `#f8f9fa` | Fondo hist-chip                              |
| Gris texto muted   | `#6B7280` | `--t-muted`                                  |
| Gris título        | `#111827` | `--t-heading`                                |
| Gris cuerpo        | `#374151` | `--t-body`                                   |
| Blanco             | `#ffffff` | Fondos de cards                              |
| Gris claro bg      | `#f5f5f5` | Page background (`bg-light`)                 |

---

## 28. Notas de comportamiento

1. **Estado vacío**: Siempre mostrar ícono grande con `display-4 opacity-25` + texto descriptivo
2. **Spinner**: Siempre usar `spinner-border text-success`
3. **Botones deshabilitados**: Mostrar spinner `spinner-border-sm` dentro del botón con `[disabled]="busy"`
4. **Modales**: Siempre `border-bottom` en header y `border-top` en footer
5. **Acciones destructivas**: Siempre pedir confirmación con modal antes de ejecutar
6. **ngModel**: Usar solo en formularios reactivos simples dentro de modales
7. **Layout toggle**: Variable `colClass` con valores `'col-12'`, `'col-12 col-md-6'`, `'col-12 col-md-4'`
8. **Asistencia**: Solo habilitada cuando `statusName === 'Programado'`
9. **Finalizar sesión**: Solo cuando `statusName === 'Programado'`
10. **Links virtuales**: Solo editables en sesiones con estado `Programado`, `Aceptada` o `Espera espacio`
11. **Toast notifications**: Usar `ToastService` del módulo shared para todos los mensajes
12. **Sidebar**: Animación suave `cubic-bezier(.4,0,.2,1)` en todas las transiciones de ancho
13. **Texto sidebar**: Ocultar con `max-width:0; opacity:0` (no `display:none`) para mantener la animación suave

