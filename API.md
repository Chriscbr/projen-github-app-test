# API Reference <a name="API Reference" id="api-reference"></a>



## Classes <a name="Classes" id="Classes"></a>

### ContributingFile <a name="ContributingFile" id="projen-test-component-1.ContributingFile"></a>

#### Initializers <a name="Initializers" id="projen-test-component-1.ContributingFile.Initializer"></a>

```typescript
import { ContributingFile } from 'projen-test-component-1'

new ContributingFile(project: NodeProject)
```

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#projen-test-component-1.ContributingFile.Initializer.parameter.project">project</a></code> | <code>projen.javascript.NodeProject</code> | *No description.* |

---

##### `project`<sup>Required</sup> <a name="project" id="projen-test-component-1.ContributingFile.Initializer.parameter.project"></a>

- *Type:* projen.javascript.NodeProject

---

#### Methods <a name="Methods" id="Methods"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#projen-test-component-1.ContributingFile.postSynthesize">postSynthesize</a></code> | Called after synthesis. |
| <code><a href="#projen-test-component-1.ContributingFile.preSynthesize">preSynthesize</a></code> | Called before synthesis. |
| <code><a href="#projen-test-component-1.ContributingFile.synthesize">synthesize</a></code> | Synthesizes files to the project output directory. |

---

##### `postSynthesize` <a name="postSynthesize" id="projen-test-component-1.ContributingFile.postSynthesize"></a>

```typescript
public postSynthesize(): void
```

Called after synthesis.

Order is *not* guaranteed.

##### `preSynthesize` <a name="preSynthesize" id="projen-test-component-1.ContributingFile.preSynthesize"></a>

```typescript
public preSynthesize(): void
```

Called before synthesis.

##### `synthesize` <a name="synthesize" id="projen-test-component-1.ContributingFile.synthesize"></a>

```typescript
public synthesize(): void
```

Synthesizes files to the project output directory.


#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#projen-test-component-1.ContributingFile.property.project">project</a></code> | <code>projen.Project</code> | *No description.* |

---

##### `project`<sup>Required</sup> <a name="project" id="projen-test-component-1.ContributingFile.property.project"></a>

```typescript
public readonly project: Project;
```

- *Type:* projen.Project

---



